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

// Prueba
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Hello from API');
});

const PORT = 80;
const server = app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(server.address());
});
