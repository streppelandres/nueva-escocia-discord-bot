const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { initializePterodactylWebSocket } = require('./services/PterodactylWebSocketService');
const { initializeRconClient } = require('./services/RconClient');
const { SteamClient } = require('./services/SteamClient')

const ALLOWED_USERS = process.env.ALLOWED_USERS.split(',');
const SERVER_IP = process.env.SERVER_IP;
const SERVER_PORT = parseInt(process.env.SERVER_PORT);
const STEAM_API_KEY = process.env.STEAM_API_KEY


function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

function loadCommands(client) {
    client.commands.clear();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = requireUncached(filePath);
        client.commands.set(command.data.name, command);
    }

    if (client.application) {
        const commands = [];
        client.commands.forEach(command => commands.push(command.data.toJSON()));
        client.application.commands.set(commands);
    }
}

function initializeBot(client) {
    client.commands = new Collection();

    client.once('ready', async () => {
        console.log(`Logged in as ${client.user.tag}`);
        
        // FIXME: This trash
        client.ws = initializePterodactylWebSocket(client).ws;
        client.rcon = await initializeRconClient(SERVER_IP, SERVER_PORT);
        client.steam = new SteamClient(STEAM_API_KEY);

        loadCommands(client);
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
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });
}

module.exports = { initializeBot, loadCommands };
