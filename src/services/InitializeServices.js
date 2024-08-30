const { serviceContext } = require('../context');
const { RconClient } = require('./RconClient');
const { PterodactylWebSocketService } = require('./PterodactylWebSocketService');
const { PterodactylApiService } = require('./PterodactylApiService');
const { SteamClient } = require('./SteamClient');
const { CONSTANTS } = require('../constants');

async function initializeServices() {
    const rconClient = new RconClient(CONSTANTS.SERVER_IP, parseInt(CONSTANTS.SERVER_PORT));
    serviceContext.addService('rconClient', rconClient);

    const pterodactylWsService = new PterodactylWebSocketService();
    serviceContext.addService('pterodactylWs', pterodactylWsService);

    const pterodactylApiService = new PterodactylApiService(CONSTANTS.PTERODACTYL_API_KEY, CONSTANTS.PTERODACTYL_BASE_URL);
    serviceContext.addService('pterodactylApi', pterodactylApiService);

    const steamClient = new SteamClient(CONSTANTS.STEAM_API_KEY);
    serviceContext.addService('steamClient', steamClient);

    console.log('All services initialized successfully');
}

module.exports = { initializeServices };
