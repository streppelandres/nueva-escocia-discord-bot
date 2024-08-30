const { CONSTANTS } = require('./src/constants');
const { Client, GatewayIntentBits } = require('discord.js');
const { serviceContext } = require('./src/context');
const { initializeBot } = require('./src/bot');
const { initializeServices } = require('./src/services/InitializeServices');

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

discordClient.once('ready', async () => {
    console.log(`Discord client logged in as ${discordClient.user.tag}`);
    serviceContext.addService('discordClient', discordClient);
    initializeBot(discordClient);

    try {
        await initializeServices();
    } catch (error) {
        console.error('Error initializing services:', error);
    }
});

discordClient.login(CONSTANTS.DISCORD_TOKEN).catch(console.error);
