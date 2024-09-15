const axios = require('axios');
const { CONSTANTS } = require('../constants')

const PTERODACTYL_API_KEY = CONSTANTS.PTERODACTYL_API_KEY;
const SERVER_ID = CONSTANTS.PTERODACTYL_SERVER_ID;
const PTERODACTYL_BASE_URL = CONSTANTS.PTERODACTYL_BASE_URL;

class PterodactylApiService {
    static async get(endpoint) {
        try {
            const url = `${PTERODACTYL_BASE_URL}/api/client/servers/${SERVER_ID}/${endpoint}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${PTERODACTYL_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            if (endpoint != 'websocket') console.log('[PterodactylApiService] Response: ', response);
            return response;
        } catch (error) {
            console.error(`[PterodactylApiService] Error fetching: [${url}]`, error);
            return null;
        }
    }

    static async getWebSocketToken() {
        const response = await PterodactylApiService.get('websocket');
        return {
            token: response.data.data.token,
            socket: response.data.data.socket
        }
    }

    static async getResources() {
        const { data } = await PterodactylApiService.get('resources');
        const { attributes } = data;
        const currentState = attributes['current_state'];
        const { memory_bytes, cpu_absolute, disk_bytes, network_rx_bytes, network_tx_bytes, uptime } = attributes['resources'];
        return {
            isRunning: currentState == 'running',
            uptime: uptime,
            currentState: currentState,
        }
    }
}

module.exports = { PterodactylApiService };
