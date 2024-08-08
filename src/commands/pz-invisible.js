const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-invisible')
        .setDescription('Make a player invisible to zombies')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The player name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('item')
                .setDescription('The value to set, example: true|false')
                .setRequired(true)),
    async execute(client, interaction) {
        const command = `invisible "${interaction.options.getString('player')}" -${interaction.options.getString('value')}`;
        client.ws.send(JSON.stringify({ event: 'send command', args: [command] }));
        await interaction.reply(`Sending command: ${command}`);
    }
};
