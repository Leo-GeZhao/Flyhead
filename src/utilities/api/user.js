import axios from "axios";
const BASE_URL = "/api/users";

export const signUp = async (data) => {
  return axios.post(`${BASE_URL}`, data);
};

export const login = async (data) => {
  return axios.post(`${BASE_URL}/login`, data);
};

export const googleSignIn = async (data) => {
  return axios.post(`${BASE_URL}/googleSignIn`, data);
};
