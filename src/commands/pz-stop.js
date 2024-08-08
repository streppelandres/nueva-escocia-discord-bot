const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-stop')
        .setDescription('Stop the server'),
    async execute(client, interaction) {
        client.ws.send(JSON.stringify({ event: 'set state', args: ['stop'] }));
        await interaction.reply('Stopping the server...');
    },
};
