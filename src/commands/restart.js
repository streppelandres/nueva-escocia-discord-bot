const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restart the server. Experimental, idk if works'),
    async execute(interaction, ws) {
        ws.send(JSON.stringify({ event: 'set state', args: ['restart'] }));
        await interaction.reply('Restarting the server...');
    },
};
