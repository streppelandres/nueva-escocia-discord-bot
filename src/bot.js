const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { initializePterodactylWebSocket } = require('./services/PterodactylWebSocketService');

const ALLOWED_USERS = process.env.ALLOWED_USERS.split(',');

function initializeBot(client) {
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
    }

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
        const pterodactylWebSocketService = initializePterodactylWebSocket(client);

        const commands = [];
        client.commands.forEach(command => commands.push(command.data.toJSON()));
        client.application.commands.set(commands);

        client.pterodactylWebSocketService = pterodactylWebSocketService;
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
            await command.execute(interaction, client.pterodactylWebSocketService.ws);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });
}

module.exports = { initializeBot };
