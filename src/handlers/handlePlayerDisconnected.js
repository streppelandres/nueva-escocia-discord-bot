const { getPlayerDionnectedEmbed } = require('../embeds/player-disconnected-embed')
const { servicesContainer } = require('../container');

async function handlePlayerDisconnected(channel, logMessage) {
    const regex = /steam-id=(\d+)\s+access=([^ ]*)\s+username="([^"]+)"/;
    const match = logMessage.match(regex);

    if (!match) {
        console.info('No se pudo encontrar el steam-id ni el username del jugador que intenta conectar');
        return;
    }

    const steamId = match[1];
    const access = match[2] || '';
    const username = match[3];

    console.log('Nuevo cierre de sesion: ', steamId, username, access)

    const info = await servicesContainer.getSteamClient().getPlayerInfo(steamId);
    if (!info) return; // FIXME: Enviar un jugador desconectado pero sin la data de steam

    const { personaname, avatarfull, profileurl } = info[0];

    channel.send({ embeds: [getPlayerDionnectedEmbed(personaname, avatarfull, profileurl, access)] });
}

module.exports = { handlePlayerDisconnected };
