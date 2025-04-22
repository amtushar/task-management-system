import axios from "axios"
import { AxiosHttpService } from "@/utils/restclient/axiosHttpService"
import { Endpoints } from "@/utils/Endpoints"

const axiosClient = new AxiosHttpService(axios);

export default class taskApi {

    async checkAndCreateTask(data: Object) {
        let output: any = await axiosClient.post(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_TASK, data)
        return output
    }

    async ReadTask(filter: Object) {
        let output: any = await axiosClient.post(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_TASKS, filter)
        return output
    }
    async ReadMissedTask(filter: Object) {
        let output: any = await axiosClient.post(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_PENDING_TASKS, filter)
        return output
    }
    async ReadDoneTask(filter: Object) {
        let output: any = await axiosClient.post(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_DONE_TASKS, filter)
        return output
    }
    async FindEfficiency(filter: Object) {
        let output: any = await axiosClient.post(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_TASK_EFFICIENCY, filter)
        return output
    }

    async UpdateTask(data: Object) {
        let output: any = await axiosClient.patch(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_TASKS, data)
        return output
    }
    
    async DeleteTask(filter: Object) {
        let output: any = await axiosClient.delete(Endpoints.BASE_URL_RESTSERVICE + Endpoints.ENDPOINT_DELETE_TASK, filter);
        return output;
    }


}