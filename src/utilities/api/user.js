import axios from "axios";
const BASE_URL = "/api/users";

export async function signUp(data) {
  return axios.post(`${BASE_URL}`, data);
}

export async function login(data) {
  return axios.post(`${BASE_URL}/login`, data);
}

export async function googleSignIn(data) {
  return axios.post(`${BASE_URL}/googleSignIn`, data);
}
