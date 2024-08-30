const WebSocket = require('ws');
const { PterodactylApiService } = require('./PterodactylApiService');
const { consoleOutputHandler } = require('../handlers/consoleOutputHandler');
const { CONSTANTS } = require('../constants');

class PterodactylWebSocketService {
    constructor() {
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
                'Origin': CONSTANTS.PTERODACTYL_BASE_URL,
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
            switch (message.event) {
                case 'jwt error':
                    this.renewToken();
                    this.connectWebSocket();
                    break;
                case 'token expiring':
                    this.renewToken();
                    break;
                case 'token expired':
                    this.connectWebSocket();
                    break;
                case 'console output':
                    await consoleOutputHandler(message.args[0]);
                    break;
                default:
                    if (message.event != 'stats') console.log('Received:', message);
                    break;
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

module.exports = { PterodactylWebSocketService };
