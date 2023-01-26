import axios from "axios";
const BASE_URL = "/api/events";

export const createEvent = async (data) => {
  return axios.post(`${BASE_URL}/create-event`, data);
};

export const getEvents = async (data) => {
  return axios.post(`${BASE_URL}/events`, data);
};

export const deleteEvent = async (id) => {
  return axios.delete(`${BASE_URL}/delete-event/${id}`);
};

export const finishEvent = async (id) => {
  return axios.put(`${BASE_URL}/finish-event/${id}`);
};

export const editExpense = async (id, data) => {
  return axios.put(`${BASE_URL}/${id}/edit-expense`, data);
};
