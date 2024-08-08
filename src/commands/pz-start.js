const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-start')
        .setDescription('Start the server'),
    async execute(client, interaction) {
        client.ws.send(JSON.stringify({ event: 'set state', args: ['start'] }));
        await interaction.reply('Starting the server...');
    },
};
