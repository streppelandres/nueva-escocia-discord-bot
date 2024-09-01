const { getPlayerDeadEmbed } = require('../embeds/player-dead-embed');
const recentDeaths = new Set();

async function handlePlayerDead(channel, logMessage) {
    const deadRegex = /text='(.+?) is dead\.'/;
    const deadMatch = logMessage.match(deadRegex);

    if (deadMatch && deadMatch[1]) {
        const playerName = deadMatch[1];

        if (!recentDeaths.has(playerName)) {
            channel.send({ embeds: [getPlayerDeadEmbed(playerName)] });
            recentDeaths.add(playerName);

            setTimeout(() => {
                recentDeaths.delete(playerName);
            }, 10000);
        }
    }
}

module.exports = { handlePlayerDead };
