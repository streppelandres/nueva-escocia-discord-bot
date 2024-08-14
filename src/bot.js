const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const ALLOWED_USERS = process.env.ALLOWED_USERS.split(',');

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

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
        loadCommands(client);
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        if (!ALLOWED_USERS.includes(interaction.user.id)) {
            await interaction.reply({ content: 'No tienes permiso para usar este comando.', ephemeral: true });
            return;
        }

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
        }
    });
}

module.exports = { initializeBot, loadCommands };
