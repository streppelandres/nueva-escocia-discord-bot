const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-add-item')
        .setDescription('Give an item to a player')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The player name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('item')
                .setDescription('The item to add, example: Base.Axe')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('count')
                .setDescription('The quantity')
                .setRequired(true)),
    async execute(client, interaction) {
        const command = `additem "${interaction.options.getString('player')}" "${interaction.options.getString('item')}" "${interaction.options.getString('count')}"`;
        client.ws.send(JSON.stringify({ event: 'send command', args: [command] }));
        await interaction.reply(`Sending command: ${command}`);
    }
};
