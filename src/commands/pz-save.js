const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-save')
        .setDescription('Saves the current game world'),
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        await serviceContext.wsSendCommand('save');
        await interaction.reply('Saving the world...');
    },
};
