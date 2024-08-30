const { serviceContext } = require('../context');
const { CONSTANTS } = require('../constants');
const { getServerOfflineEmbed } = require('../embeds/server-offline-embed');

const LOG_CHANNEL_ID = CONSTANTS.LOG_CHANNEL_ID;

async function statusOutputHandler(status) {
    const discordClient = serviceContext.getDiscordClient();
    if (!discordClient) {
        console.log("Discord client not available yet");
        return;
    }

    const channel = discordClient.channels.cache.get(LOG_CHANNEL_ID);
    if (!channel) return;

    switch (status) {
        case 'offline':
            channel.send({ embeds: [getServerOfflineEmbed()] });
            break;
        default:
            break;
    }
}

module.exports = { statusOutputHandler };
