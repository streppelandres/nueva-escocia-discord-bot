const { handleServerStarted } = require('./handleServerStarted');

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;
let playersNext = false;

function consoleOutputHandler(logMessage, client) {
    const channel = client.channels.cache.get(LOG_CHANNEL_ID);
    if (!channel) return;

    if (logMessage.includes('SERVER STARTED')) handleServerStarted(channel);

    if (logMessage.includes('Players connected')) {
        playersNext = true;
        playersBuffer = [];
    } else if (playersNext && logMessage.startsWith('-')) {
        playersBuffer.push(logMessage);
    } else if (playersNext && !logMessage.startsWith('-')) {
        playersNext = false;
        if (playersBuffer.length > 0 && channel) {
            const playerCount = playersBuffer.length;
            const messageToSend = `Jugadores conectados: (${playerCount})\n${playersBuffer.join('\n')}`;
            channel.send(messageToSend);
            playersBuffer = [];
        }
    }
}

module.exports = { consoleOutputHandler };
