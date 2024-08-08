const axios = require('axios');

class SteamClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getConfig() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    }

    async getPlayerInfo(steamId) {
        try {
            const response = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${steamId}`, this.getConfig());
            return response.data.response.players
        } catch (error) {
            console.error('Error fetching player info', error);
            return null;
        }
    }
}

module.exports = { SteamClient };