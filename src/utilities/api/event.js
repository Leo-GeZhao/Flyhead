import axios from "axios";
const BASE_URL = '/api/events'

export async function createEvent(data){
    return axios.post(`${BASE_URL}/create-event`,data)
}

export function getEvents(){
    return axios.get(`${BASE_URL}/events`)
}

export function deleteEvent(id){
    return axios.delete(`${BASE_URL}/delete-event/${id}`)
}