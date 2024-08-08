const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-kill')
        .setDescription('Kills the server. Experimental, idk if works'),
    async execute(client, interaction) {
        client.ws.send(JSON.stringify({ event: 'set state', args: ['kill'] }));
        await interaction.reply('Killing the server...');
    },
};
