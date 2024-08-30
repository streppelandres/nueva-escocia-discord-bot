const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-start')
        .setDescription('Start the server'),
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        await serviceContext.wsSetState('start');
        await interaction.reply('Starting the server...');
    },
};
