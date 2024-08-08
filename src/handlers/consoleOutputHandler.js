const { handleServerStarted } = require('./handleServerStarted');
const { handlePlayerConnected } = require('./handlePlayerConnected');
const { handlePlayerDisconnected } = require('./handlePlayerDisconnected');

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;

async function consoleOutputHandler(logMessage, client) {
    const channel = client.channels.cache.get(LOG_CHANNEL_ID);
    if (!channel) return;
    if (logMessage.includes('*** SERVER STARTED ****')) handleServerStarted(channel);
    if (logMessage.includes('ConnectionManager: [fully-connected]')) await handlePlayerConnected(client, channel, logMessage);
    if (logMessage.includes('ConnectionManager: [disconnect] "receive-disconnect"')) await handlePlayerDisconnected(client, channel, logMessage);
}

module.exports = { consoleOutputHandler };
