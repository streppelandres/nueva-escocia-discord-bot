const axios = require('axios');

const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;
const SERVER_ID = process.env.SERVER_ID;
const PTERODACTYL_BASE_URL = process.env.PTERODACTYL_BASE_URL;

class PterodactylApiService {
    static async getWebSocketToken() {
        try {
            const response = await axios.get(`${PTERODACTYL_BASE_URL}/api/client/servers/${SERVER_ID}/websocket`, {
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
