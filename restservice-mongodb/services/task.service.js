
const taskModel = require('../schemas/task/task.schema');
const userModel = require('../schemas/user/user.schema');
const engine = require('../utils/engine.util');
const configs = require('../configs');
const endpoints = require('../utils/endpoints.util');
const express = require('express');

const taskService = express.Router();


// This API is used for task creation.
taskService.post(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_TASK, async (req, res) => {
    const session = await taskModel.startSession();
    try {
        console.log('we are here in restService', req.body);
        dataBaseConnection = await engine.generateDatabaseConnector(configs.DATABASE_URL);

        let filter = {
            name: req.body.name
        }

        const existingVenue = await taskModel.findOne(filter);

        if (existingVenue) {
            const stucturedResponse = engine.generateServiceResponse(null, req.method, 409, req.originalUrl, "Task Already exists");
            return res.json(stucturedResponse);
        }

        // Start transaction
        session.startTransaction();

        // Insert the new task
        const output = await taskModel.insertMany([req.body], { session });

        // Now we update the user’s taskAssigned array with the new task ID
        const userID = req.body.assignedTo.userID;  // Get the userID from the request body

        // Update the user's taskAssigned count
        const userUpdateResult = await userModel.updateOne(
            { userID: userID }, // Filter by the user ID
            { $inc: { taskAssigned: 1 } }, // Increment the taskAssigned field by 1
            { session } // Pass the session to ensure it's part of the transaction
        );


        console.log('updatedResult', userUpdateResult);

        // here i want to update the userField i.e taskAssigned array by adding this taskID to that user array to whom this task is being
        // assigned .. userID is in the req.body.assignedTo.userID

        // Commit transaction if all operations succeed
        await session.commitTransaction();
        session.endSession();

        const stucturedResponse = engine.generateServiceResponse(output, req.method, 200, req.originalUrl, 'Task Created Successfully!');
        res.json(stucturedResponse);
    }

    catch (error) {
        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);
    }

})



// An Api for reading multiple task by filter and pagination
taskService.post(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_TASKS, async (req, res) => {
    try {
        engine.generateDatabaseConnector(configs.DATABASE_URL);

        // Extract page and filter settings from the request body
        const page = req.body.page || 1;
        const limit = 10;
        const skip = limit * (page - 1);

        const today = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

        const filter = req.body.filter || {};

        // Add conditions to filter only pending tasks with a deadline >= today
        filter.status = "Pending";
        filter.deadline = { $gte: today };

        // If the user is a "member", filter tasks assigned specifically to them
        if (req.user.userRole === "member") {
            filter["assignedTo.userID"] = req.user.userID; // Match tasks assigned to the logged-in user
        }

        // Get total count based on filtered criteria
        const totalCount = await taskModel.countDocuments(filter);

        // Fetch the filtered and paginated data
        const output = await taskModel
            .find(filter)
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 })

        // Generate and send a structured response
        const structuredResponse = engine.generateServiceResponse(output, req.method, 200, req.originalUrl, 'success');
        structuredResponse.totalCount = totalCount;
        res.json(structuredResponse);

    } catch (error) {
        // Handle and send errors as a structured response
        const structuredResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(structuredResponse);
    }
});


// done tasks
taskService.post(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_DONE_TASKS, async (req, res) => {
    try {
        engine.generateDatabaseConnector(configs.DATABASE_URL);

        // Extract page, country, and filter settings from the request body
        const page = req.body.page || 1;
        const limit = 10;
        const skip = limit * (page - 1);


        const filter = req.body.filter || {};

        // Check if user is `partnerAdmin` and adjust filter accordingly

     

        // Add a condition to fetch only tasks with a status of "Pending"
        filter.status = "Done";

        // If the user is a "member", filter tasks assigned specifically to them
        if (req.user.userRole === "member") {
            filter["assignedTo.userID"] = req.user.userID; // Match tasks assigned to the logged-in user
        }

           // Get total count based on filtered criteria
           const totalCount = await taskModel.countDocuments(filter);

        // Fetch the filtered and paginated data
        const output = await taskModel
            .find(filter)
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 })

        const structuredResponse = engine.generateServiceResponse(output, req.method, 200, req.originalUrl, 'success');
        structuredResponse.totalCount = totalCount;
        res.json(structuredResponse);

    } catch (error) {
        const structuredResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(structuredResponse);
    }
});

// missed tasks
taskService.post(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_MISSED_TASKS, async (req, res) => {
    try {
        engine.generateDatabaseConnector(configs.DATABASE_URL);

        // Extract page, country, and filter settings from the request body
        const page = req.body.page || 1;
        const limit = 10;
        const skip = limit * (page - 1);

        const filter = req.body.filter || {};

        // Add a condition to fetch only tasks with a status of "Pending"
        filter.status = "Pending";

        // Add condition to check if the deadline is in the past
        const today = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
        filter.deadline = { $lt: today }; // Match tasks with deadlines earlier than today

        // If the user is a "member", filter tasks assigned specifically to them
        if (req.user.userRole === "member") {
            filter["assignedTo.userID"] = req.user.userID; // Match tasks assigned to the logged-in user
        }

        // Get total count based on filtered criteria
        const totalCount = await taskModel.countDocuments(filter);

        console.log('totalCount', totalCount, filter);
        // Fetch the filtered and paginated data
        const output = await taskModel
            .find(filter)
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 })

        const structuredResponse = engine.generateServiceResponse(output, req.method, 200, req.originalUrl, 'success');
        structuredResponse.totalCount = totalCount;
        res.json(structuredResponse);

    } catch (error) {
        const structuredResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(structuredResponse);
    }
});




taskService.patch(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_TASKS, async (req, res) => {
    const session = await taskModel.startSession();
    try {
        // Start transaction
        session.startTransaction();

        // Connect to the database
        dataBaseConnection = await engine.generateDatabaseConnector(configs.DATABASE_URL);

        const { taskID, status, userID } = req.body;

        // Update task status to "Done" if taskID matches and assigned user matches userID
        const taskUpdateResult = await taskModel.updateOne(
            { taskID: taskID, "assignedTo.userID": userID },
            { $set: { status: status } },
            { session }
        );

        // Check if the task update was successful
        if (taskUpdateResult.matchedCount === 0) {
            throw new Error("No matching task found");
        }

        // Increment the taskDone count for the corresponding user
        const userUpdateResult = await userModel.updateOne(
            { userID: userID },
            { $inc: { taskDone: 1 } },
            { session }
        );

        console.log('userUpdateResult', userUpdateResult, userID)

        // Check if the user update was successful
        if (userUpdateResult.matchedCount === 0) {
            throw new Error("Failed to update user's task count.");
        }

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        // Prepare structured response
        const structuredResponse = engine.generateServiceResponse(
            userUpdateResult,
            req.method,
            200,
            req.originalUrl,
            "Task status updated successfully and user task count incremented."
        );
        res.json(structuredResponse);
    } catch (error) {
        // Abort transaction on error
        await session.abortTransaction();
        session.endSession();

        // Prepare structured error response
        const structuredResponse = engine.generateServiceResponse(
            null,
            req.method,
            500,
            req.originalUrl,
            error.message
        );
        res.json(structuredResponse);
    }
});


taskService.delete(
    endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_DELETE_TASK,
    async (req, res) => {
        try {
            console.log('here ', req.body)
            const { userID, taskID } = req.body;

            if (!userID || !taskID) {
                throw new Error("Missing required fields: userID or taskID");
            }

            // Connect to the database
            dataBaseConnection = await engine.generateDatabaseConnector(configs.DATABASE_URL);

            // Delete the task based on the taskID
            const deleteTaskOutput = await taskModel.deleteOne({ taskID: taskID });

            if (deleteTaskOutput.deletedCount === 0) {
                throw new Error("Task not found or already deleted");
            }

            // Decrement the taskAssigned field in the userModel
            const updateUserOutput = await userModel.updateOne(
                { userID: userID }, // Match userID
                { $inc: { taskAssigned: -1 } } // Decrement taskAssigned by 1
            );

            if (updateUserOutput.matchedCount === 0) {
                throw new Error("User not found or update failed");
            }

            // Generate success response
            const structuredResponse = engine.generateServiceResponse(
                { deleteTaskOutput, updateUserOutput },
                req.method,
                200,
                req.originalUrl,
                "Task deleted and user updated successfully"
            );
            res.json(structuredResponse);

        } catch (error) {
            // Generate error response
            const structuredResponse = engine.generateServiceResponse(
                null,
                req.method,
                500,
                req.originalUrl,
                error.message
            );
            res.json(structuredResponse);
        }
    }
);



// An Api for caclulating efficiency
taskService.post(endpoints.ENDPOINT_API_VERSION + endpoints.ENDPOINT_TASK_EFFICIENCY, async (req, res) => { 
    try {
        engine.generateDatabaseConnector(configs.DATABASE_URL);

        console.log('filterr', req.body);
        const { userID, taskDone } = req.body || {};

        if (!userID || taskDone == undefined) {
            throw new Error("Missing required fields: userID, or taskDone");
        }

        const today = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format

        // Find missed tasks (where deadline < today and assignedTo.userID matches the given userID)
        const missedTasks = await taskModel.countDocuments({
            "assignedTo.userID": userID,
            deadline: { $lt: today },
            status: "Pending" // Ensure only pending tasks are considered missed
        });

        // Efficiency formula
        const efficiency = (taskDone > 0 || missedTasks > 0)
            ? (taskDone / (taskDone + missedTasks)) * 100
            : 0; // Avoid division by zero

        // Round efficiency to 2 decimal places
        const roundedEfficiency = parseFloat(efficiency.toFixed(2));

        // Generate and send a structured response
        const structuredResponse = engine.generateServiceResponse({
            taskDone: taskDone,
            taskMissed: missedTasks,
            efficiency: roundedEfficiency
        }, req.method, 200, req.originalUrl, 'success');

        res.json(structuredResponse);

    } catch (error) {
        // Handle and send errors as a structured response
        const structuredResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(structuredResponse);
    }
});


module.exports = taskService; 