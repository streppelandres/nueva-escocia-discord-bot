const { SlashCommandBuilder } = require('discord.js');

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
    async execute(client, interaction) {
        const command = `setaccesslevel "${interaction.options.getString('player')}" "${interaction.options.getString('level')}"`;
        client.ws.send(JSON.stringify({ event: 'send command', args: [command] }));
        await interaction.reply(`Sending command: ${command}`);
    }
};
