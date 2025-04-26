import axios from "axios"
import { AxiosHttpService } from "@/utils/restclient/axiosHttpService"
import { Endpoints } from "@/utils/Endpoints"

const axiosClient = new AxiosHttpService(axios);

export default class usersApi {

    async checkAndCreateUsers(data: Object){
        let output: any = await axiosClient.post(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_USER,data)
        return output
    }

    async ReadUser(filter: Object) {
      
        let output: any = await axiosClient.post(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_USERS,filter)
        return output
    }

    async SearchUser(query: string) {
        let output: any = await axiosClient.get(
            `${Endpoints.BASE_URL_RESTSERVICE}${Endpoints.ENDPOINT_USERS_SEARCH}?query=${query}`
        );
        return output;
    }

    async LoginUser(filter: Object) {
       
        let output: any = await axiosClient.post(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_USERS_LOGIN,filter)
        return output
    }
    async LogoutUser() {
       
        let output: any = await axiosClient.get(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_USERS_LOGOUT)
        return output
    }

    async ValidateUser() {
        let output: any = await axiosClient.get(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_USERS_SESSION_VALIDATE)
        return output
    }

    async CurrentUser(permission: String) {
        let output: any = await axiosClient.get(`${Endpoints.BASE_URL_RESTSERVICE}${Endpoints.ENDPOINT_CURRENT_USER}?permission=${permission}`);
        return output;
    }
    
    async UpdateUser(filter: Object, fields: Object, permission: String) {
        let output: any = await axiosClient.patch(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_USERS,{filter, fields, permission})
        return output
    }
  

}