const axios = require('axios');

class SteamClient {
    constructor(apiKey) {
        this.baseUrl = 'http://api.steampowered.com'
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
            const response = await axios.get(
                `${this.baseUrl}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${steamId}`,
                this.getConfig()
            );
            return response.data.response?.players
        } catch (error) {
            console.error('Error fetching player info', error);
            return null;
        }
    }
}

module.exports = { SteamClient };