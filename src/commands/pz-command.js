const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-command')
        .setDescription('Send a command to the server')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The command to send, example: servermsg "Hola mundo!"')
                .setRequired(true)),
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        const command = interaction.options.getString('input');
        await serviceContext.wsSendCommand(command);
        await interaction.reply(`Sending command: ${command}`);
    },
};
