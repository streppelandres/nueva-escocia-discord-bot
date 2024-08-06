require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { initializeBot } = require('./src/bot');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

initializeBot(client);

client.login(DISCORD_TOKEN);