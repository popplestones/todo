import axios from 'axios';

const baseApiClient = axios.create({
    baseURL: "https://todo.popplestones.au/api",
    // withCredentials: true
});


export {baseApiClient};