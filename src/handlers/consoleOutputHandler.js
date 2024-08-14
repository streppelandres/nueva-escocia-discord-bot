const { handleServerStarted } = require('./handleServerStarted');
const { handlePlayerConnected } = require('./handlePlayerConnected');
const { handlePlayerDisconnected } = require('./handlePlayerDisconnected');
const { servicesContainer } = require('../container');

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;

async function consoleOutputHandler(logMessage) {
    const channel = await servicesContainer.getDiscordClient().channels.cache.get(LOG_CHANNEL_ID);
    if (!channel) return;
    if (logMessage.includes('*** SERVER STARTED ****')) handleServerStarted(channel);
    if (logMessage.includes('ConnectionManager: [fully-connected]')) await handlePlayerConnected(channel, logMessage);
    if (logMessage.includes('ConnectionManager: [disconnect] "receive-disconnect"')) await handlePlayerDisconnected(channel, logMessage);
}

module.exports = { consoleOutputHandler };
