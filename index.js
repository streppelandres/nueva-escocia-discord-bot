const { CONSTANTS } = require('./src/constants');
const { Client, GatewayIntentBits } = require('discord.js');
const { serviceContext } = require('./src/context');
const { initializeBot } = require('./src/bot');
const { initializeServices } = require('./src/services/InitializeServices');
const { BotApi } = require('./src/api/BotApi');

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const botApi = new BotApi();

discordClient.once('ready', async () => {
    console.log(`Discord client logged in as ${discordClient.user.tag}`);
    serviceContext.addService('discordClient', discordClient);
    initializeBot(discordClient);

    try {
        await initializeServices();
    } catch (error) {
        console.error('Error initializing services:', error);
    }

    try {
        botApi.listen();
    } catch (error) {
        console.error('Error initializing bot api:', error);
    }
});

discordClient.login(CONSTANTS.DISCORD_TOKEN).catch(console.error);