const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

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
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        const command = `invisible "${interaction.options.getString('player')}" -${interaction.options.getString('value')}`;
        await serviceContext.wsSendCommand(command);
        await interaction.reply(`Sending command: ${command}`);
    }
};
