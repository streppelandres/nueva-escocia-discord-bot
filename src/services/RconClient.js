const { Server } = require('@fabricio-191/valve-server-query');

class RconClient {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.server = null;
        this.initialize();
    }

    async initialize() {
        this.server = await Server({
            ip: this.ip,
            port: parseInt(this.port),
            timeout: 5000
        })
    }

    async getPlayers() {
        try {
            const response = await this.server.getPlayers();
            console.log('Getting players response: ', response);
            return response;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}

module.exports = { RconClient };