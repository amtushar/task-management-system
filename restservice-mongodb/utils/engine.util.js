

const mongoose = require('mongoose');
const pino = require('pino')
const pretty = require('pino-pretty')


module.exports = class engine {

    static generateConsoleLogger() {
        return pino(pretty({ colorize: true }))
    }


    static generateDatabaseConnector(databaseUrl) {
        mongoose.set('strictQuery', false);
        const databaseConnector = mongoose.connect(databaseUrl)
            .then(() => {
                console.log('Connected to MongoDB Successfully');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });

        return databaseConnector;
    }




    static generateServiceResponse(output, method, status, originalUrl, message) {
        let serviceResponse = {
            outputResponse: output,
            apiResponse: {
                output: output,
                method: method,
                status: status,
                message: message ? message : "User Created Successfully!",
                timestamp: new Date().toLocaleString(),
                url: originalUrl
            }
        }

        return serviceResponse;
    }

    
    static getUnauthorizedResponse(req) {
        return engine.generateServiceResponse(null, null, req.method, 401, `Unauthorized request of Username: ${req.auth.user} and Password:${req.auth.password}`, req.originalUrl)
    }


}

