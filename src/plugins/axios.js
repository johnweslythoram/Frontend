import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-cpc6.onrender.com', // Backend API URL
    headers: {
        'x-api-key' : 'john',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api;