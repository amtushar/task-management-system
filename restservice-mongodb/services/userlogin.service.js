const userModel = require('../schemas/user/user.schema');
const engine = require('../utils/engine.util');
const configs = require('../configs');
const endpoints = require('../utils/endpoints.util');
const express = require('express');

const userLoginService = express.Router();

const bcrypt = require('bcrypt');

userLoginService.post(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_USERS_LOGIN, async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            const structuredResponse = engine.generateServiceResponse(null, req.method, 400, req.originalUrl, 'Email and password are required');
            return res.status(400).json(structuredResponse);
        }

        // Connect to the database
        await engine.generateDatabaseConnector(configs.DATABASE_URL);

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user || !user.userID) {
            const structuredResponse = engine.generateServiceResponse(null, req.method, 404, req.originalUrl, 'User Not Found!');
            return res.status(404).json(structuredResponse);
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            const structuredResponse = engine.generateServiceResponse(null, req.method, 401, req.originalUrl, 'Password Not Matched!');
            return res.json(structuredResponse);
        }

        // Generate access token
        const accessToken = user.generateAccessToken(user.userID);

        // Retrieve user data without sensitive fields
        const userData = await userModel.findOne({ email }).select('-password -isDeleted -isVerified -_id -createdAt -createdBy -deletedBy -updatedAt -__v');

        // Structured success response
        const structuredResponse = engine.generateServiceResponse(userData, req.method, 200, req.originalUrl, 'success');

        // Set the access token in a secure cookie
        res.cookie('accessToken', accessToken, {
            maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week
            secure: false, // Set to true if using HTTPS
            sameSite: 'Lax'
        }).json(structuredResponse);

    } catch (error) {
        const structuredResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.status(500).json(structuredResponse);
    }
});


// An Api for user Logout
userLoginService.get(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_USERS_LOGOUT, async (req, res)=> {

    try {

        res.clearCookie('accessToken');
        const stucturedResponse = engine.generateServiceResponse(true, req.method, 200, req.originalUrl, 'logout successful');
        res.json(stucturedResponse);
        
    } catch (error) {
        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);
    }

})

module.exports = userLoginService; 
