const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-access-level')
        .setDescription('Set access level of a player')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The player name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('level')
                .setDescription('The value to set, examples: admin, moderator, overseer, gm, observer or none')
                .setRequired(true)),
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        const command = `setaccesslevel "${interaction.options.getString('player')}" "${interaction.options.getString('level')}"`;
        await serviceContext.wsSendCommand(command);
        await interaction.reply(`Sending command: ${command}`);
    }
};
