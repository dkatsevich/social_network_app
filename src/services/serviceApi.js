import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '8e2051ba-3198-4ba7-b7f9-6c6ee8e02777'
    }
});

export default instance;