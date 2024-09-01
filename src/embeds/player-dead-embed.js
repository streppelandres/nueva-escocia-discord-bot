const MESSAGES = [
    'F',
    'Lo visitó el técnico para revisar el módem'
]

const MOODLES = [
    'https://pzwiki.net/w/images/3/39/Moodle_Icon_Injured.png',
    'https://pzwiki.net/w/images/d/dd/Moodle_Icon_Pain.png',
    'https://pzwiki.net/w/images/6/65/Moodle_Icon_Bleeding.png',
    'https://pzwiki.net/w/images/f/fa/Moodle_Icon_Sick.png',
    'https://pzwiki.net/w/images/3/3e/Moodle_Icon_Zombie.png',
    'https://pzwiki.net/w/images/e/e4/Moodle_Icon_Panic.png'
]

function getPlayerDeadEmbed(playerName) {
    const embed = {
        "color": 9936031,
        "author": {
            "icon_url": MOODLES[Math.floor(Math.random() * MOODLES.length)],
            "name": `${playerName} se murio`
        },
        // "description": MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
    }

    return embed;
}

module.exports = { getPlayerDeadEmbed }