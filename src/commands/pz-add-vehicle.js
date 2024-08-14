const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-add-vehicle')
        .setDescription('Spawn a vehicle')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The player name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('vehicle')
                .setDescription('The vehicle to spawn, example: Base.Van')
                .setRequired(true)),
    async execute(client, interaction) {
        const command = `addvehicle "${interaction.options.getString('vehicle')}" "${interaction.options.getString('player')}"`;
        client.ws.send(JSON.stringify({ event: 'send command', args: [command] }));
        await interaction.reply(`Sending command: ${command}`);
    }
};
