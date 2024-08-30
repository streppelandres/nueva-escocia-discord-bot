const { SlashCommandBuilder } = require('discord.js');
const { serviceContext } = require('../context');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-message')
        .setDescription('Broadcast a message to all connected players')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to broadcast')
                .setRequired(true)),
    async execute(interaction, isAdmin) {
        if (!isAdmin) throw 'You do not have permission to use this command';
        const command = `servermsg "${interaction.options.getString('message')}"`;
        await serviceContext.wsSendCommand(command);
        await interaction.reply(`Sending command: ${command}`);
    }
};
