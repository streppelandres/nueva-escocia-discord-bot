const MESSAGES = [
    { thumbnail: 'https://media1.tenor.com/m/jjRNCHJPEU0AAAAd/kun-aguero.gif', description: "Bueno, vamo' a juga'" },
    { thumbnail: 'https://i.redd.it/qebuleiaj4w81.jpg', description: 'A viciar!' },
    { thumbnail: 'https://pbs.twimg.com/media/BWpi2ioIMAEBZ0s.jpg', description: 'Volvió el host, server prendido' },
    { thumbnail: 'https://i.pinimg.com/736x/6a/07/f4/6a07f4de1a40d6ef3aa6bc246bee3893.jpg', description: 'AGUANTE BOOOOOOOOOOCA!' },
    { thumbnail: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/MYASVT7HWBALJAPMXQR4OQ5Z6I.jpg', description: 'Volvió la luz, server arriba!' },
]

function getServerStartedEmbed() {
    const { thumbnail, description } = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    return {
        "description": `${description}`,
        "title": "Servidor iniciado",
        "color": 65305,
        "thumbnail": {
            "url": `${thumbnail}`
        }
    }
}

module.exports = { getServerStartedEmbed }