/**
* Description      : This file contains all the endpoints for this application 
**/


export class Endpoints {



  // rest-service base url
  static BASE_URL_RESTSERVICE = "https://taskmanagementsystem.in"

  // Endpoint names for user login-logout
  static ENDPOINT_USERS_LOGIN = "/api/rest/tms/1.0.0/userslogin/v1/users/login"
  static ENDPOINT_USERS_LOGOUT = "/api/rest/tms/1.0.0/userslogin/v1/users/logout"

  // Endpoint names for user group
  static ENDPOINT_USER = "/api/rest/tms/1.0.0/users/v1/user"
  static ENDPOINT_USERS = "/api/rest/tms/1.0.0/users/v1/users"
  static ENDPOINT_USERS_CREATETASK = "/api/rest/tms/1.0.0/users/v1/userscreatetask"
  static ENDPOINT_USERS_SEARCH = "/api/rest/tms/1.0.0/users/v1/usersnamesearch"
  static ENDPOINT_READ_ONE_USER = "/api/rest/tms/1.0.0/users/v1/user/:userid"
  
  // Endpoint names for user profile group
  static ENDPOINT_CURRENT_USER = "/api/rest/tms/1.0.0/userprofile/v1/currentuser"
  

  // Endpoint names for task group
  static ENDPOINT_TASK = "/api/rest/tms/1.0.0/tasks/v1/task"
  static ENDPOINT_TASKS = "/api/rest/tms/1.0.0/tasks/v1/tasks" // ongoing
  static ENDPOINT_PENDING_TASKS = "/api/rest/tms/1.0.0/tasks/v1/missedtasks"
  static ENDPOINT_DONE_TASKS = "/api/rest/tms/1.0.0/tasks/v1/donetasks"
  static ENDPOINT_DELETE_TASK = "/api/rest/tms/1.0.0/tasks/v1/deletetask"
  static ENDPOINT_READ_ONE_TASK = "/api/rest/tms/1.0.0/tasks/v1/task/:taskid"
  static ENDPOINT_TASK_EFFICIENCY = "/api/rest/tms/1.0.0/tasks/v1/taskefficiency"


    // Endpoint names for booking group
    static ENDPOINT_BOOKING = "/api/rest/tms/1.0.0/bookings/v1/booking"
    static ENDPOINT_BOOKINGS = "/api/rest/tms/1.0.0/bookings/v1/bookings"

}