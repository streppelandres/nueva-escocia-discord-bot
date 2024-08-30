class ServiceContext {
    constructor() {
        this.services = {};
    }

    addService(name, instance) {
        this.services[name] = instance;
    }

    getService(name) {
        return this.services[name];
    }

    getSteamClient() {
        return this.getService('steamClient');
    }

    getRconClient() {
        return this.getService('rconClient');
    }

    getPterodactylApiService() {
        return this.getService('pterodactylApiService');
    }

    getPterodactylWebSocketService() {
        return this.getService('pterodactylWs');
    }

    async wsSendCommand(command) {
        await this.getPterodactylWebSocketService().ws.send(JSON.stringify({ event: 'send command', args: [command] }));
    }

    async wsSetState(state) {
        await this.getPterodactylWebSocketService().ws.send(JSON.stringify({ event: 'set state', args: [state] }));
    }

    getDiscordClient() {
        return this.getService('discordClient');
    }
}

const serviceContext = new ServiceContext();
module.exports = { serviceContext };
