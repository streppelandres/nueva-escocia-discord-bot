const EMOJIS = [
    'https://cdn3.emoji.gg/emojis/FeelsCopMan.png',
    'https://cdn3.emoji.gg/emojis/4854_pepe_police.png',
    'https://cdn3.emoji.gg/emojis/9107-policestop.png',
    'https://cdn3.emoji.gg/emojis/4514-pepe-police-dog.gif',
    'https://cdn3.emoji.gg/emojis/3857_pepe_police.png'
]

const MESSAGES = [
    'Cuiden sus pertenencias',
    'Cayó el más feo, su mamá en vez de darle el pecho le daba la espalda',
    'Hincha de Riestra',
    'Parece que hay conexión a internet en el conurbano',
    'Se supone que los presidiarios no tienen acceso a internet'
]

const MESSAGES_ADMIN = [
    'Llegó la ley, arriba las manos',
    'Llegó el rey de los botones',
    'Vino el gil que se mata configurando el server',
    'Apareció el boludo que paga el host',
    'El que se chitea con los comandos de admin'
]

function getPlayerConnectedEmbed(playerName, profilePicture, profileUrl, access) {
    const embed = {
        "color": 3014400,
        "url": profileUrl,
        "author": {
            "url": profileUrl,
            "icon_url": profilePicture,
            "name": `${playerName} se conectó al servidor`
        },
        "description": MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
    }

    if (access) {
        embed['thumbnail'] = { 'url': EMOJIS[Math.floor(Math.random() * EMOJIS.length)] };
        embed['footer'] = { "text": 'Administrador conectado' };
        embed['description'] = MESSAGES_ADMIN[Math.floor(Math.random() * MESSAGES_ADMIN.length)];
        embed['color'] = 208371;
    }

    return embed;
}

module.exports = { getPlayerConnectedEmbed }