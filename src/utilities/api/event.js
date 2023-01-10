import axios from "axios";
const BASE_URL = "/api/events";

export async function createEvent(data) {
  return axios.post(`${BASE_URL}/create-event`, data);
}

export function getEvents(data) {
  return axios.post(`${BASE_URL}/events`, data);
}

export function deleteEvent(id) {
  return axios.delete(`${BASE_URL}/delete-event/${id}`);
}

export function finishEvent(id) {
  return axios.put(`${BASE_URL}/finish-event/${id}`);
}

export function editExpense(id, data) {
  return axios.put(`${BASE_URL}/${id}/edit-expense`, data);
}
