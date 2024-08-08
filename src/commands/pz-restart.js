const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-restart')
        .setDescription('Restart the server. Experimental, idk if works'),
    async execute(client, interaction) {
        client.ws.send(JSON.stringify({ event: 'set state', args: ['restart'] }));
        await interaction.reply('Restarting the server...');
    },
};
