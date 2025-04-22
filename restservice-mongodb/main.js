
const express = require('express');
const cors = require('cors');
const endpoints = require('./utils/endpoints.util.js')
const engine = require("./utils/engine.util.js")
const messages = require('./utils/messages.util.js')
const configs = require("./configs.js")
const cookieParser = require('cookie-parser');

/******** Services or Controllers *********/
const userService = require("./services/user.service.js");
const taskService = require('./services/task.service.js');
const userAuth = require('./middleware/authentication.js');
const userProfileService = require('./services/userprofile.service.js');
const checkPermission = require('./middleware/authorization.js');
const userLoginService = require('./services/userlogin.service.js');

const restService = express();
const consoleLogger = engine.generateConsoleLogger();

/****** Adding Configurations to rest service object ******/
restService.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
restService.use(express.json());
restService.use(cookieParser());

restService.use(endpoints.ENDPOINT_BASE_URL + endpoints.ENDPOINT_GROUP_USER_LOGIN,  userLoginService);
restService.use(endpoints.ENDPOINT_BASE_URL + endpoints.ENDPOINT_GROUP_USER_PROFILE, userAuth, checkPermission, userProfileService); // for capturing current logged in user in redux state 
restService.use(endpoints.ENDPOINT_BASE_URL + endpoints.ENDPOINT_GROUP_USER, userAuth, checkPermission, userService);
restService.use(endpoints.ENDPOINT_BASE_URL + endpoints.ENDPOINT_GROUP_TASK, userAuth, checkPermission, taskService);

// Starting the Rest-Service Based on the security configuration
restService.listen(configs.REST_SERVICE_PORT)
consoleLogger.info(messages.REST_SERVICE_RUNNING_MESSAGE + ` {${configs.REST_SERVICE_HOST}` + ":" + `${configs.REST_SERVICE_PORT}}`)