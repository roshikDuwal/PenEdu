import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/url';

export class Axios {
    constructor(config) {
        const a = axios.create({
            baseURL: SERVER_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        a.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {
            window.location.replace("/login");
            }
            throw error;
        });
        a.interceptors.request.use(async (request) => {
            const user = JSON.parse(localStorage.getItem("user", "{}"));
            if(user?.token)
                request.headers['Authorization'] = `Bearer ${user?.token}`;

            return request;
        })
        return a;
    }
}
