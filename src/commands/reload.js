const { SlashCommandBuilder } = require('@discordjs/builders');
const { loadCommands } = require('../bot')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads all commands'),
    async execute(client, interaction) {
        const { client2 } = interaction;
        try {
            loadCommands(client2);
            await interaction.reply('Commands have been reloaded!');
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while reloading commands!', ephemeral: true });
        }
    }
};
