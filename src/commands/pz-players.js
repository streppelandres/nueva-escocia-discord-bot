const { SlashCommandBuilder } = require('discord.js');
const { getPlayerListEmbed, PlayerConnected } = require('../embeds/player-list-embed')

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID; // FIXME: Esto aca medio rancio
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pz-players')
        .setDescription('Get player list'),
    async execute(client, interaction) {
        await interaction.deferReply();
        const response = await client.rcon.getPlayers();
        if (response) {
            const players = response.map(p => new PlayerConnected(p.name, p.timeOnline.toString()));
            const channel = await client.channels.cache.get(LOG_CHANNEL_ID);

            if (!channel) {
                await interaction.editReply({ embeds: [getPlayerListEmbed(players)] })
            } else {
                await channel.send({ embeds: [getPlayerListEmbed(players)] });
                await interaction.editReply('Lista de jugadores enviada al canal de logs.');
            }
        } else {
            await interaction.editReply('No hay jugadores conectados, una cagada el servidor');
        }
    }
};
