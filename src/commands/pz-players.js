const { SlashCommandBuilder } = require('discord.js');
const { getPlayerListEmbed, PlayerConnected } = require('../embeds/player-list-embed')
const { servicesContainer } = require('../container');

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID; // FIXME: Esto aca medio rancio
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-players')
        .setDescription('Get player list'),
    async execute(client, interaction) {
        await interaction.deferReply();
        const response = await servicesContainer.getRconClient().getPlayers();

        if (!response) await interaction.editReply('No hay jugadores o no anda el servicio de Steam, una cagada');

        const players = response.map(p => new PlayerConnected(p.name, p.timeOnline.toString()));
        const channel = await client.channels.cache.get(LOG_CHANNEL_ID);

        if (channel) {
            await channel.send({ embeds: [getPlayerListEmbed(players)] });
        }

        await interaction.editReply({ embeds: [getPlayerListEmbed(players)] });
    }
};
