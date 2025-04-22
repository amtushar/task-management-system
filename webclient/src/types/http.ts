// This is the interface for the service that will handle the HTTP requests
export interface HttpService {
    get(url: string, ): Promise<any>;
    post(url: string, data: any): Promise<any>;
    put(url: string, data: any): Promise<any>;
    delete(url: string): Promise<any>;
}