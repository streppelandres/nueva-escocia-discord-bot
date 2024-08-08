const { SlashCommandBuilder } = require('discord.js');

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
    async execute(client, interaction) {
        const command = `addxp "${interaction.options.getString('player')}" ${interaction.options.getString('perk')}=${interaction.options.getString('value')}`;
        client.ws.send(JSON.stringify({ event: 'send command', args: [command] }));
        await interaction.reply(`Sending command: ${command}`);
    }
};
