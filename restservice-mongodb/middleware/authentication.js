const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const engine = require('../utils/engine.util');
const configs = require('../configs');
const userModel = require('../schemas/user/user.schema');

const userAuth = async (req, res, next) => {

    try {
        const token = req.cookies.accessToken; 

        if (!token) {
            const stucturedResponse = engine.generateServiceResponse(null, req.method, 401, req.originalUrl, 'Access token is missing.');
            return res.json(stucturedResponse);
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, user) => {
          
            if (err) {
                const stucturedResponse = engine.generateServiceResponse(null, req.method, 403, req.originalUrl, 'Invalid access token.');
                return res.json(stucturedResponse);
            }

            engine.generateDatabaseConnector(configs.DATABASE_URL);

            const output = await userModel.findOne({ userID: user._id }).select('-password -isDeleted -isVerified -_id -createdAt -updatedAt -__v');
            if(!output){
                const stucturedResponse = engine.generateServiceResponse(null, req.method, 404, req.originalUrl, 'User Authentication Failed!');
                return res.json(stucturedResponse);
            }
          
            req.user = output; 

            next();
        })



    } catch (error) {
        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);
    }

}

module.exports = userAuth;