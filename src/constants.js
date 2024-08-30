require('dotenv').config();

const CONSTANTS = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    LOG_CHANNEL_ID: process.env.LOG_CHANNEL_ID,
    ADMIN_USERS: process.env.ADMIN_USERS?.split(','),
    PTERODACTYL_API_KEY: process.env.PTERODACTYL_API_KEY,
    PTERODACTYL_SERVER_ID: process.env.PTERODACTYL_SERVER_ID,
    PTERODACTYL_BASE_URL: process.env.PTERODACTYL_BASE_URL,
    STEAM_API_KEY: process.env.STEAM_API_KEY,
    SERVER_IP: process.env.PZ_SERVER_IP,
    SERVER_PORT: parseInt(process.env.PZ_SERVER_PORT)
}

console.log(CONSTANTS)

module.exports = { CONSTANTS }