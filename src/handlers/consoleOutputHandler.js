const { handleServerStarted } = require('./handleServerStarted');
const { handlePlayerConnected } = require('./handlePlayerConnected');
const { handlePlayerDisconnected } = require('./handlePlayerDisconnected');
const { handlePlayerDead } = require('./handlePlayerDead');
const { serviceContext } = require('../context');
const { CONSTANTS } = require('../constants');

const LOG_CHANNEL_ID = CONSTANTS.LOG_CHANNEL_ID;

async function consoleOutputHandler(logMessage) {
    const discordClient = serviceContext.getDiscordClient();
    if (!discordClient) {
        console.log("Discord client not available yet");
        return;
    }

    const channel = discordClient.channels.cache.get(LOG_CHANNEL_ID);
    if (!channel) return;

    if (logMessage.includes('*** SERVER STARTED ****')) handleServerStarted(channel);
    if (logMessage.includes('ConnectionManager: [fully-connected]')) await handlePlayerConnected(channel, logMessage);
    if (logMessage.includes('ConnectionManager: [disconnect] "receive-disconnect"')) await handlePlayerDisconnected(channel, logMessage);

    await handlePlayerDead(channel, logMessage);
}

module.exports = { consoleOutputHandler };
