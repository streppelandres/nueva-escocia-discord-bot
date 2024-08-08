const { getPlayerConnectedEmbed } = require('../embeds/player-connected-embed')

async function handlePlayerConnected(client, channel, logMessage) {
    const regex = /steam-id=(\d+)\s+access=([^ ]*)\s+username="([^"]+)"/;
    const match = logMessage.match(regex);

    if (!match) {
        console.info('No se pudo encontrar el steam-id ni el username del jugador que intenta conectar');
        return;
    }

    const steamId = match[1];
    const access = match[2] || '';
    const username = match[3];

    console.log('Nuevo inicio de sesion: ', steamId, username, access)

    const info = await client.steam.getPlayerInfo(steamId);
    if(!info) return; // FIXME: Enviar un jugador conectado pero sin la data de steam

    const { personaname, avatarfull, profileurl } = info[0];

    console.log(personaname, avatarfull, profileurl, access);

    channel.send({ embeds: [getPlayerConnectedEmbed(personaname, avatarfull, profileurl, access)] });
}

module.exports = { handlePlayerConnected };
