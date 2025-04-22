/* eslint-disable no-unused-vars */
import { AxiosInstance, AxiosBasicCredentials, AxiosResponse } from 'axios';
// import { Response } from 'node-fetch';

// import { HttpService } from '@/types/http';

interface HttpService {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data: any): Promise<T>;
    put<T>(url: string, data: any): Promise<T>;
    patch<T>(url: string, data: any): Promise<T>;
    delete<T>(url: string, filter: any): Promise<T>;
}



// The AxiosHttpService class implements the HttpService interface using axios
export class AxiosHttpService implements HttpService {
    constructor(private axios: AxiosInstance) { 
    }


    private generateResponse(response: AxiosResponse) {
        return {
            status: response.status,
            message: response.statusText,
            output: response.data,
        };
    }

    async get(url: string): Promise<any> {
      
        let response = await this.axios.get(url, {
            withCredentials: true 
        })
      
        return this.generateResponse(response)
    }

   
    async post(url: string, data: any): Promise<any> {
       
        let response = await this.axios.post(url, data, {
            withCredentials: true 
        })
        return this.generateResponse(response)
    }

    async put(url: string, data: any): Promise<any> {
        let response = await this.axios.put(url, data)
        return this.generateResponse(response)
    }
    async patch(url: string, data: any): Promise<any> {
        let response = await this.axios.patch(url, data, {
            withCredentials: true 
        })
        return this.generateResponse(response)
    }

    async delete(url: string, filter: any): Promise<any> {
        let response = await this.axios.delete(url, {
            data: filter, // Include the filter in the data field
            withCredentials: true, // Add withCredentials in the config
        });
        return this.generateResponse(response);
    }
    
    
}