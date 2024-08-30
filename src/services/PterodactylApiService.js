const axios = require('axios');
const { CONSTANTS } = require('../constants')

const PTERODACTYL_API_KEY = CONSTANTS.PTERODACTYL_API_KEY;
const SERVER_ID = CONSTANTS.PTERODACTYL_SERVER_ID;
const PTERODACTYL_BASE_URL = CONSTANTS.PTERODACTYL_BASE_URL;

// FIXME
class PterodactylApiService {
    static async getWebSocketToken() {
        try {
            const url = `${PTERODACTYL_BASE_URL}/api/client/servers/${SERVER_ID}/websocket`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${PTERODACTYL_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            return {
                token: response.data.data.token,
                socket: response.data.data.socket
            }
        } catch (error) {
            console.error('Error fetching WebSocket token:', error);
            return null;
        }
    }
}

module.exports = { PterodactylApiService };
