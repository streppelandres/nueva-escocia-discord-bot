require('dotenv').config();
const { initializeBot } = require('./src/bot');
const { servicesContainer } = require('./src/container');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const discordClient = servicesContainer.getDiscordClient();

initializeBot(discordClient);

discordClient.login(DISCORD_TOKEN);