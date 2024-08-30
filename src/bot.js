const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { CONSTANTS } = require('./constants');

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

async function initializeBot(client) {
    client.commands = new Collection();
    loadCommands(client);

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        const isAdmin = CONSTANTS.ADMIN_USERS.includes(interaction.user.id);

        try {
            await command.execute(interaction, isAdmin);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: error | 'Hubo un error al ejecutar este comando.', ephemeral: true });
        }
    });
}

module.exports = { initializeBot, loadCommands };
