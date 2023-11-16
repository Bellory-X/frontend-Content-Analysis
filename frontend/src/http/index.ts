import axios from 'axios';

export const API_URL = 'http://localhost:8080'

const $api = axios.create({
    withCredentials: true,
    baseURL:API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = ''
    return config;
})

// $api.interceptors.response.use((config) => {
//     return config;
// }, async (error => {
//     if (error.response.status == 401) {
//         const responce = await
//     }
// }))

export default $api;