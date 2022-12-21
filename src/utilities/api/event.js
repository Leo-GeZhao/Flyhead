import axios from "axios";
const BASE_URL = '/api/events'

export async function createEvent(data){
    await axios.post(`${BASE_URL}/create-event`,data)
}

export function getEvents(){
    return axios.get(`${BASE_URL}/events`)
}