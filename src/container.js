const { Container } = require('inversify');
const { SERVICE_NAMES } = require('./services/serviceNames');
const { SteamClient } = require('./services/SteamClient');
const { PterodactylWebSocketService } = require('./services/PterodactylWebSocketService');
const { RconClient } = require('./services/RconClient');
const { PterodactylApiService } = require('./services/PterodactylApiService');
const { Client, GatewayIntentBits } = require('discord.js');

class ServicesContainer extends Container {
    getSteamClient() {
        return this.get(SERVICE_NAMES.STEAM_CLIENT);
    }

    getPterodactylWs() {
        return this.get(SERVICE_NAMES.PTERODACTYL_WS);
    }

    getRconClient() {
        return this.get(SERVICE_NAMES.RCON_CLIENT);
    }

    getDiscordClient() {
        return this.get(SERVICE_NAMES.DISCORD_CLIENT);
    }
}

const servicesContainer = new ServicesContainer();

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const SERVER_IP = process.env.SERVER_IP;
const SERVER_PORT = parseInt(process.env.SERVER_PORT);

servicesContainer.bind(SERVICE_NAMES.STEAM_CLIENT).toConstantValue(new SteamClient(STEAM_API_KEY));
servicesContainer.bind(SERVICE_NAMES.RCON_CLIENT).toConstantValue(new RconClient(SERVER_IP, SERVER_PORT));
servicesContainer.bind(SERVICE_NAMES.PTERODACTYL_API).toConstantValue(new PterodactylApiService());

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

servicesContainer.bind(SERVICE_NAMES.DISCORD_CLIENT).toConstantValue(discordClient);
servicesContainer.bind(SERVICE_NAMES.PTERODACTYL_WS).toConstantValue(new PterodactylWebSocketService());

module.exports = { servicesContainer };
