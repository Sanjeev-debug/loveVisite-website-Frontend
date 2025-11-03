import axios from 'axios';
const VITE_BACKEND_URL= import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
    baseURL:VITE_BACKEND_URL,
    withCredentials: true  
});

export default API;