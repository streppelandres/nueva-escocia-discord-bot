const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-add-xp')
        .setDescription('Give experience points to a player.')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The player name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('perk')
                .setDescription('The perk to add experience, example: Mechanics')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('value')
                .setDescription('The experience value to add')
                .setRequired(true)),
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        const command = `addxp "${interaction.options.getString('player')}" ${interaction.options.getString('perk')}=${interaction.options.getString('value')}`;
        await serviceContext.wsSendCommand(command);
        await interaction.reply(`Sending command: ${command}`);
    }
};
