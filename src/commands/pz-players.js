const { SlashCommandBuilder } = require('discord.js');
const { getPlayerListEmbed, PlayerConnected } = require('../embeds/player-list-embed')
const { serviceContext } = require('../context');
const { CONSTANTS } = require('../constants');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-players')
        .setDescription('Get player list'),
    async execute(client, interaction, isAdmin) {
        await interaction.deferReply();
        const response = await serviceContext.getRconClient().getPlayers();

        if (!response) await interaction.editReply('No hay jugadores o no anda el servicio de Steam, una cagada');

        const players = response.map(p => new PlayerConnected(p.name, p.timeOnline.toString()));
        const channel = await client.channels.cache.get(CONSTANTS.LOG_CHANNEL_ID);

        if (channel) {
            await channel.send({ embeds: [getPlayerListEmbed(players)] });
        }

        await interaction.editReply({ embeds: [getPlayerListEmbed(players)] });
    }
};
