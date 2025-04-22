
const userModel = require('../schemas/user/user.schema');
const engine = require('../utils/engine.util');
const configs = require('../configs');
const endpoints = require('../utils/endpoints.util');
const express = require('express');

const userService = express.Router();

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// This API is used for user registration or user creation.
userService.post(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_USER, async (req, res) => {

    try {
        // console.log('here in user post');

        dataBaseConnection = await engine.generateDatabaseConnector(configs.DATABASE_URL);
        // console.log("request body in restservice",req.body)
        let filter = {
            email:  req.body.data.email,
            contact: req.body.data.contact
        }

        const existingUser = await userModel.findOne(filter);

        if(existingUser){
            const stucturedResponse = engine.generateServiceResponse(null, req.method, 409, req.originalUrl, "User Already exists");
            return res.json(stucturedResponse);
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(req.body.data.password, SALT_ROUNDS);

        // Create user data with hashed password
        const newUser = {
            ...req.body.data,
            password: hashedPassword
        };
        const output = await userModel.insertMany(newUser);
        const stucturedResponse = engine.generateServiceResponse(output, req.method, 200, req.originalUrl);
        res.json(stucturedResponse);
    }

    catch (error) {
        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);
    }

})



// An Api for reading multiple users by filter and pagination
userService.post(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_USERS, async (req, res) => {
    try {
        engine.generateDatabaseConnector(configs.DATABASE_URL);
    
        
        const totalCount = await userModel.countDocuments({ userRole: { $nin: "TeamLead" } });

        let filter = req.body.filter || {};

        const page = req.body.page || 1;
        const limit = 10; // Fixed limit per page, you can make this dynamic if needed
        // Calculate the number of users to skip based on the current page
        const skip = limit * (page - 1);
        if(req.body.country){
            filter['country'] = req.body.country
        }
     
        const output = await userModel.find({ ...filter, userRole: { $nin: "TeamLead" } }).select('-_id -createdAt -updatedAt -password -__v')
        .limit(req.body.limit || limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        const stucturedResponse = engine.generateServiceResponse(output, req.method, 200, req.originalUrl, 'success');
        // Add totalCount to the structured response
        stucturedResponse.totalCount = totalCount;
        res.json(stucturedResponse);

    } catch (error) {
        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);
    }
})




//This Api updates multiple users based on filter
userService.patch(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_USERS, async (req, res) => {
    try {
        // Connect to the database
        dataBaseConnection = await engine.generateDatabaseConnector(configs.DATABASE_URL);
         console.log('password', req.body.fields.password);
         console.log('here', req.body.filter.userID, req.body.fields);
        // Check if password is provided and needs to be hashed

      
           
        if (req.body.fields && req.body.fields.password) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(req.body.fields.password, SALT_ROUNDS);

            // Update the password field with the hashed password
            req.body.fields.password = hashedPassword;
        }

        // Check for duplicate email or number
        if ( req.body.fields.email ||  req.body.fields.number) {
            const duplicateQuery = {
                $or: [
                    { email:  req.body.fields.email },
                    { contact:  req.body.fields.contact }
                ],
                userID: { $ne:  req.body.filter.userID } 
            };

            console.log('duplicateQuery', duplicateQuery);
            const duplicateExists = await userModel.findOne(duplicateQuery);

            if (duplicateExists) {
                const stucturedResponse = engine.generateServiceResponse(
                    null,
                    req.method,
                    409,
                    req.originalUrl,
                    'Email or number already exists'
                );
                return res.json(stucturedResponse);
            }
        }

        // Perform the update operation
        const output = await userModel.updateMany(req.body.filter, req.body.fields);

        // Generate a response and send it
        const stucturedResponse = engine.generateServiceResponse(output, req.method, 200, req.originalUrl, 'success');
        res.json(stucturedResponse);
    } catch (error) {
        // Handle errors and send a structured response
        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);
    }
});

// This Api deletes multiple users based on filter
userService.delete(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_USERS, async (req, res) => {
    try {
        dataBaseConnection = engine.generateDatabaseConnector(configs.DATABASE_URL);

        const output = await userModel.deleteMany(req.body.filter);
        const stucturedResponse = engine.generateServiceResponse(output, req.method, 200, req.originalUrl, 'success');
        res.json(stucturedResponse);

    } catch (error) {
        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);
    }
})

// An Api for reading multiple users in create tasks
userService.post(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_USERS_CREATETASK, async (req, res) => {
    try {
        engine.generateDatabaseConnector(configs.DATABASE_URL);
    
        
        const totalCount = await userModel.countDocuments({ userRole: { $nin: "TeamLead" } });

        let filter = req.body.filter || {};

     
        const output = await userModel.find({ ...filter, userRole: { $nin: "TeamLead" } }).select('-_id -createdAt -updatedAt -password -__v')
        .sort({ createdAt: -1 })
        const stucturedResponse = engine.generateServiceResponse(output, req.method, 200, req.originalUrl, 'success');
        // Add totalCount to the structured response
        stucturedResponse.totalCount = totalCount;
        res.json(stucturedResponse);

    } catch (error) {
        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);
    }
})

// An Api for searching user name by query
userService.get(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_USERS_NAME_SEARCH, async (req, res) => {
    try {

        console.log('query', req.query);

        let filter = {};

        if (req.query.query) {
            filter['name'] = { $regex: req.query.query, $options: 'i' };
        }

        if (req.user?.userRole === 'TeamLead') {
            filter['userRole'] = { $ne: 'TeamLead' }; // or $nin: ['TeamLead']
        }

        const users = await userModel.find(
            filter, 
            { userID: 1, name: 1, _id: 0 }  // Select only relevant fields
        );

        if (users.length === 0) {
            return res.json(engine.generateServiceResponse([], req.method, 200, req.originalUrl, 'No users match the search criteria.'));
        }

        // Return the filtered users
        res.json({ data: users });

    } catch (error) {
        const structuredResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(structuredResponse);
    }
    })



module.exports = userService;