import axios from 'axios';
import {Config} from "../constants";

export const LOGIN = 'login';
const {
    API_URL,
    TOKEN_URL
} = Config;

export const login = (username: string, password: string) => {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

  const token = axios.post(API_URL + TOKEN_URL, formData, {

  });
  console.log(token);
  return {
    payload: token,
    type: LOGIN,
  }

};


export const register = (token: string) => {

};