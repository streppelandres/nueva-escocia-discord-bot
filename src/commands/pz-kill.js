const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-kill')
        .setDescription('Kills the server. Experimental, idk if works'),
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        await serviceContext.wsSetState('kill');
        await interaction.reply('Killing the server...');
    },
};
