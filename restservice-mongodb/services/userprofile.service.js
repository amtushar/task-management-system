
const engine = require('../utils/engine.util');
const configs = require('../configs');
const endpoints = require('../utils/endpoints.util');
const express = require('express');

const userProfileService = express.Router();



// An Api for capturing logged in user
userProfileService.get(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_CURRENT_USER, async (req, res) => {

    try {
        dataBaseConnection = await engine.generateDatabaseConnector(configs.DATABASE_URL);
        console.log('req.user', req.user);
        const user = req.user;
        const stucturedResponse = engine.generateServiceResponse(user, req.method, 200, req.originalUrl, 'user');
        res.json(stucturedResponse);


    } catch (error) {

        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);

    }

})

module.exports = userProfileService