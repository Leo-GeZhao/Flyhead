import * as usersAPI from "../api/user";

export const getToken = () => {
  const token = window.localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(window.atob(token.split(".")[1]));

  if (payload.exp < Date.now() / 1000) {
    window.localStorage.removeItem("token");
    return null;
  }

  return token;
};

export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  return JSON.parse(window.atob(token.split(".")[1])).user;
};

export const signUp = async (formData) => {
  const token = await usersAPI.signUp(formData);
  window.localStorage.setItem("token", JSON.stringify(token));
  return getUser();
};

export const login = async (credentials) => {
  const token = await usersAPI.login(credentials);
  window.localStorage.setItem("token", JSON.stringify(token));
  return getUser();
};

export const googleSignIn = async (data) => {
  const token = await usersAPI.googleSignIn(data);
  window.localStorage.setItem("token", JSON.stringify(token));
  return getUser();
};

export const logout = () => {
  localStorage.removeItem("token");
};
