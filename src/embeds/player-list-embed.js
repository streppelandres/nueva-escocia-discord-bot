// TODO: Tenerlo subido en un static
const THUMBNAILS = [
    'https://64.media.tumblr.com/92523c0cbbfc7fa3451ddec200f6474e/7ca6a0439de6612c-18/s250x400/89f0c9e785762f27a2c324614725e51651035a27.gif',
    'https://pzwiki.net/w/images/d/d8/SpiffoSurvivor.png',
    'https://i.imgur.com/fVU3AKd.png'
]

// TODO: Que busque los emojis del server
//const EMOJIS = [':axe:', ':ioro:', ':marce:', ':traverso:', ':zomboid:', ':kjj:', ':pepeboca:']

class PlayerConnected {
    constructor(name, time) {
        this.name = name
        this.time = time
    }
}

function getPlayerListEmbed(players) {
    const fields = players.map(p => ({
        'name': `${p.name ? p.name : '|| privado ||'}`,
        'value': `Tiempo: ${p.time}`,
        'inline': true
    }));

    return {
        "color": 10509236,
        "thumbnail": {
            "url": `${THUMBNAILS[Math.floor(Math.random() * THUMBNAILS.length)]}`
        },
        "fields": fields,
        "description": `## Jugadores en línea (${fields.length})`
    }
}

module.exports = { getPlayerListEmbed, PlayerConnected }