const MESSAGES = [
    'Edesur le cortó la luz por falta de pago, agarrá la pala',
    'Sufrió robo de cables en la zona y se quedó sin luz',
    'Se le cortó internet',
    'Le cortó la luz Edesur',
    'La pareja de no la deja jugar más, la próxima le aplica doctrina Alberto',
    'Se aburrió de este server de mierda',
    'Se le crasheó el juego mal optimizado este',
    'Se le crasheó de tantos mods de mierda que instalaron',
    '¡Cuidado! Le cayó la federal por portación de contenido ilegal en su disco duro'
]

function getPlayerDionnectedEmbed(playerName, profilePicture, profileUrl, access) {
    const embed = {
        "color": 6061450,
        "url": profileUrl,
        "author": {
            "url": profileUrl,
            "icon_url": profilePicture,
            "name": `${playerName} se desconectó del servidor`
        },
        "description": MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
    }

    if (access) {
        embed['footer'] = { "text": 'Administrador desconectado' };
        embed['color'] = 16711680;
    }

    return embed;
}

module.exports = { getPlayerDionnectedEmbed }