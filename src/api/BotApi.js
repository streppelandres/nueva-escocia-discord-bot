const express = require('express');
const { serviceContext } = require('../context');
const { CONSTANTS } = require('../constants');
const { PterodactylApiService } = require('../services/PterodactylApiService');

class BotApi {
    constructor() {
        this.app = express();
        this.port = CONSTANTS.BOT_API_PORT || 3000;
        this.apiKey = CONSTANTS.BOT_API_KEY
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(this.apiKeyMiddleware.bind(this));
    }

    apiKeyMiddleware(req, res, next) {
        const apiKey = req.headers['x-api-key'];
        if (apiKey && apiKey === this.apiKey) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }

    initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Hello from Express API');
        });

        this.app.get('/api/players', async (req, res) => {
            const response = await serviceContext.getRconClient().getPlayers();
            res.send(response);
        });

        this.app.get('/api/resources', async (req, res) => {
            const response = await PterodactylApiService.getResources();
            res.send(response);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`API running on port ${this.port}`);
        });
    }
}

module.exports = { BotApi };
