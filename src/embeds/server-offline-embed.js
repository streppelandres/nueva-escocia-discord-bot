const MESSAGES = [
    { thumbnail: 'https://pbs.twimg.com/media/BWpi2ioIMAEBZ0s.jpg', description: 'A dormir' },
    { thumbnail: 'https://pbs.twimg.com/tweet_video_thumb/E0oTnZZWEAMvVTS.jpg', description: 'Se cayo el sistema' },
]

function getServerOfflineEmbed() {
    const { thumbnail, description } = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    return {
        "description": `${description}`,
        "title": "Servidor desconectado",
        "color": 10038562,
        "image": {
            "url": `${thumbnail}`
        }
    }
}

module.exports = { getServerOfflineEmbed }