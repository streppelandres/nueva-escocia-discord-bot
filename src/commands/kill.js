const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('Kills the server. Experimental, idk if works'),
    async execute(interaction, ws) {
        ws.send(JSON.stringify({ event: 'set state', args: ['kill'] }));
        await interaction.reply('Killing the server...');
    },
};
