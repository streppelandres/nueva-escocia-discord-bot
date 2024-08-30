const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-stop')
        .setDescription('Stop the server'),
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        await serviceContext.wsSetState('stop');
        await interaction.reply('Stopping the server...');
    },
};
