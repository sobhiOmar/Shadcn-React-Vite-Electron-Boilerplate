import axios from 'axios';

export function signup(userData) {
  return axios.post(`/api/users/createUser`, userData);
}

export function login(userData) {
  return axios.post(`/api/users/login`, userData);
}
