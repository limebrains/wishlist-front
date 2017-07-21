import axios from 'axios';
import {Config} from "../constants";

export const LOGIN = 'login';
export const RETRIEVE_TOKEN = 'retrieve_token';
export const GET_USER_DATA = 'get_user_data';
const {
    API_URL,
    TOKEN_URL,
    GET_USER_URL
} = Config;

export const login = (username: string, password: string) => {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

  const token = axios.post(API_URL + TOKEN_URL, formData,);
  return {
    payload: token,
    type: LOGIN,
  }

};

export const getUserData = (token: string) => {
   const userData = axios.get(API_URL + GET_USER_URL, {
         headers: {Authorization: "Token " + token},
       }
   );

    return {
    payload: userData,
    type: GET_USER_DATA,
  }
};

export const retrieveSessionToken = () => {
  return {
    type: RETRIEVE_TOKEN,
  }
};

export const register = (token: string) => {

};