const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-message')
        .setDescription('Broadcast a message to all connected players')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to broadcast')
                .setRequired(true)),
    async execute(client, interaction) {
        const command = `servermsg "${interaction.options.getString('message')}"`;
        client.ws.send(JSON.stringify({ event: 'send command', args: [command] }));
        await interaction.reply(`Sending command: ${command}`);
    }
};
