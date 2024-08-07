const { getServerStartedEmbed } = require('../embeds/server-started-embed')

function handleServerStarted(channel) {
    channel.send({ embeds: [getServerStartedEmbed()] });
}

module.exports = { handleServerStarted };
