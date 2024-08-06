const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('command')
        .setDescription('Send a command to the server')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The command to send, example: servermsg "Hola mundo!"')
                .setRequired(true)),
    async execute(interaction, ws) {
        const command = interaction.options.getString('input');
        ws.send(JSON.stringify({ event: 'send command', args: [command] }));
        await interaction.reply(`Sending command: ${command}`);
    },
};
