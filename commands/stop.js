const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the server'),
    async execute(interaction, ws) {
        ws.send(JSON.stringify({ event: 'set state', args: ['stop'] }));
        await interaction.reply('Stopping the server...');
    },
};
