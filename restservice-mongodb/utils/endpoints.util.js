
module.exports = class endpoints {

    // base url    
    static ENDPOINT_BASE_URL = "/api/rest/tms"
    
    
    // endpoints for different groups
    static ENDPOINT_GROUP_USER_LOGIN = "/1.0.0/userslogin"
    static ENDPOINT_GROUP_USER = "/1.0.0/users"
    static ENDPOINT_GROUP_USER_PROFILE = "/1.0.0/userprofile"
    static ENDPOINT_GROUP_TASK = "/1.0.0/tasks"
    
    
    // endpoints for different versions
    static ENDPOINT_API_VERSION = "/v1"
    

    // endpoints for usergroup
    static ENDPOINT_USER = "/user" //creating one or multiple object
    static ENDPOINT_USERS = "/users"  //reading multiple objects
    static ENDPOINT_USERCHECK = "/usercheck"  
    static ENDPOINT_USERS_LOGIN = "/users/login"  // for user login
    static ENDPOINT_USERS_LOGOUT = "/users/logout"  // for user login
    static ENDPOINT_ONE_USER = "/user/:id" // reading one object using id
    static ENDPOINT_USERS_CREATETASK = "/userscreatetask"  //reading multiple objects
    static ENDPOINT_USERS_NAME_SEARCH = "/usersnamesearch"  //search for user name

    
    // endpoints for logged in user
    static ENDPOINT_CURRENT_USER = "/currentuser"  //for capturing user

    // endpoints for venuegroup
    static ENDPOINT_TASK = "/task" //creating one or multiple object
    static ENDPOINT_TASKS = "/tasks"  //reading multiple objects
    static ENDPOINT_MISSED_TASKS = "/missedtasks"  //reading multiple objects
    static ENDPOINT_DONE_TASKS = "/donetasks"  //reading multiple objects
    static ENDPOINT_DELETE_TASK = "/deletetask"  //reading multiple objects
    static ENDPOINT_ONE_TASK = "/task/:id" // reading one object using id

    static ENDPOINT_TASK_EFFICIENCY= "/taskefficiency" //creating one or multiple object

  
    
    }
    