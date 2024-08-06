const WebSocket = require('ws');
const { PterodactylApiService } = require('./PterodactylApiService');
const { consoleOutputHandler } = require('../handlers/consoleOutputHandler');

class PterodactylWebSocketService {
    constructor(client) {
        this.client = client;
        this.ws = null;
        this.currentToken = null;
        this.connectWebSocket();
    }

    async connectWebSocket() {
        const tokenData = await PterodactylApiService.getWebSocketToken();
        if (!tokenData) {
            console.error('Failed to get WebSocket token, retrying in 5 seconds...');
            setTimeout(() => this.connectWebSocket(), 5000);
            return;
        }

        const wsUrl = tokenData.socket;
        this.currentToken = tokenData.token;

        this.ws = new WebSocket(wsUrl, {
            headers: {
                'Origin': process.env.PTERODACTYL_BASE_URL,
            }
        });

        this.ws.on('open', () => {
            this.ws.send(JSON.stringify({
                event: 'auth',
                args: [this.currentToken],
            }));
        });

        this.ws.on('message', async (data) => {
            const message = JSON.parse(data);
            console.log('Received:', message);

            if (message.event === 'jwt error') {
                this.renewToken();
                this.connectWebSocket();
            }

            if (message.event === 'token expiring') {
                this.renewToken();
            }

            if (message.event === 'token expired') {
                this.connectWebSocket();
            }

            if (message.event === 'console output') {
                consoleOutputHandler(message.args[0], this.client);
            }
        });

        this.ws.on('close', () => {
            console.log('WebSocket closed. Reconnecting...');
            setTimeout(() => this.connectWebSocket(), 5000);
        });

        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            this.ws.close();
        });
    }

    async renewToken() {
        const tokenData = await PterodactylApiService.getWebSocketToken();
        this.currentToken = tokenData.token;
        this.ws.send(JSON.stringify({
            event: 'auth',
            args: [this.currentToken],
        }));
    }
}

function initializePterodactylWebSocket(client) {
    return new PterodactylWebSocketService(client);
}

module.exports = { initializePterodactylWebSocket };
