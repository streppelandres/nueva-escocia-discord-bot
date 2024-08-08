const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-save')
        .setDescription('Saves the current game world'),
    async execute(client, interaction) {
        client.ws.send(JSON.stringify({ event: 'send command', args: ['save'] }));
        await interaction.reply(`Sending command: ${command}`);
    },
};
