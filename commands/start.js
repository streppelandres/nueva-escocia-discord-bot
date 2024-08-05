const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start the server'),
    async execute(interaction, ws) {
        ws.send(JSON.stringify({ event: 'set state', args: ['start'] }));
        await interaction.reply('Starting the server...');
    },
};
