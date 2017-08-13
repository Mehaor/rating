import axios from 'axios';


export let api = axios.create({
    baseURL: '/api/v1/',
});