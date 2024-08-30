const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

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
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        const command = `addvehicle "${interaction.options.getString('vehicle')}" "${interaction.options.getString('player')}"`;
        await serviceContext.wsSendCommand(command);
        await interaction.reply(`Sending command: ${command}`);
    }
};
