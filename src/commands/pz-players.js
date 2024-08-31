const { SlashCommandBuilder } = require('discord.js');
const { getPlayerListEmbed, PlayerConnected } = require('../embeds/player-list-embed')
const { serviceContext } = require('../context');
const { CONSTANTS } = require('../constants');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-players')
        .setDescription('Get player list'),
    async execute(interaction, isAdmin) {
        await interaction.deferReply();
        const response = await serviceContext.getRconClient().getPlayers();

        if (!response) await interaction.editReply('No hay jugadores o no anda el servicio de Steam, una cagada');

        const players = response.map(p => new PlayerConnected(p.name, p.timeOnline.toString()));

        const discordClient = serviceContext.getDiscordClient();
        if (!discordClient) {
            console.log("Discord client not available yet");
            return;
        }

        const channelId = interaction.channelId;

        if (channelId !== CONSTANTS.LOG_CHANNEL_ID) {
            const channel = await discordClient.channels.cache.get(CONSTANTS.LOG_CHANNEL_ID);
            if (channel) {
                await channel.send({ embeds: [getPlayerListEmbed(players)] });
            }
        }

        await interaction.editReply({ embeds: [getPlayerListEmbed(players)] });
    }
};
