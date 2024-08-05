require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const axios = require('axios');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;
const SERVER_ID = process.env.SERVER_ID;
const PTERODACTYL_BASE_URL = process.env.PTERODACTYL_BASE_URL;
const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;
const ALLOWED_USERS = process.env.ALLOWED_USERS.split(',');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

let ws;
let currentToken;
let playersNext = false;

async function getWebSocketToken() {
    try {
        const response = await axios.get(`${PTERODACTYL_BASE_URL}/api/client/servers/${SERVER_ID}/websocket`, {
            headers: {
                'Authorization': `Bearer ${PTERODACTYL_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        return {
            token: response.data.data.token,
            socket: response.data.data.socket
        }
    } catch (error) {
        console.error('Error fetching WebSocket token:', error);
        return null;  // Ensure the function returns null in case of an error
    }
}

async function connectWebSocket() {
    const tokenData = await getWebSocketToken();
    if (!tokenData) {
        console.error('Failed to get WebSocket token, retrying in 5 seconds...');
        setTimeout(connectWebSocket, 5000);
        return;
    }

    const wsUrl = tokenData.socket;
    currentToken = tokenData.token;

    ws = new WebSocket(wsUrl, {
        headers: {
            'Origin': PTERODACTYL_BASE_URL,
        }
    });

    ws.on('open', () => {
        ws.send(JSON.stringify({
            event: 'auth',
            args: [currentToken],
        }));
    });

    ws.on('message', async (data) => {
        const message = JSON.parse(data);
        console.log('Received:', message);

        if (message.event === 'jwt error') {
            renewToken();
            connectWebSocket();
        }

        if (message.event === 'token expiring') {
            renewToken();
        }

        if (message.event === 'token expired') {
            connectWebSocket();
        }

        if (message.event === 'console output') {
            const logMessage = message.args[0];
            const channel = client.channels.cache.get(LOG_CHANNEL_ID);

            if (logMessage.includes('SERVER STARTED')) {
                if (channel) {
                    channel.send('El servidor ha sido iniciado.');
                }
            }

            if (logMessage.includes('Players connected')) {
                playersNext = true;
                playersBuffer = [];
            } else if (playersNext && logMessage.startsWith('-')) {
                playersBuffer.push(logMessage);
            } else if (playersNext && !logMessage.startsWith('-')) {
                playersNext = false;
                if (playersBuffer.length > 0 && channel) {
                    const playerCount = playersBuffer.length;
                    const messageToSend = `Jugadores conectados: (${playerCount})\n${playersBuffer.join('\n')}`;
                    channel.send(messageToSend);
                    playersBuffer = [];
                }
            }
        }
    });

    ws.on('close', () => {
        console.log('WebSocket closed. Reconnecting...');
        setTimeout(connectWebSocket, 5000);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        ws.close();
    });
}

async function renewToken() {
    currentToken = await getWebSocketToken();
    ws.send(JSON.stringify({
        event: 'auth',
        args: [currentToken],
    }));
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    connectWebSocket();

    const commands = [];
    client.commands.forEach(command => commands.push(command.data.toJSON()));
    client.application.commands.set(commands);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (!ALLOWED_USERS.includes(interaction.user.id)) {
        await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        return;
    }

    try {
        await command.execute(interaction, ws);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(DISCORD_TOKEN);
