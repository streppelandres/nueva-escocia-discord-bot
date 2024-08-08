const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-command')
        .setDescription('Send a command to the server')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The command to send, example: servermsg "Hola mundo!"')
                .setRequired(true)),
    async execute(client, interaction) {
        const command = interaction.options.getString('input');
        client.ws.send(JSON.stringify({ event: 'send command', args: [command] }));
        await interaction.reply(`Sending command: ${command}`);
    },
};
