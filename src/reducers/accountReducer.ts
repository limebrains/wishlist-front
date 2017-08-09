import {LOGIN, RETRIEVE_TOKEN, GET_USER_DATA, LOGOUT} from '../actions/loginRegister';
import {Iuser} from "../components/common/interfaces";
const localStorage = require('local-storage-fallback');

export const LOCAL_STORAGE_SAVED_TOKEN = "token";

interface IauthState {
  token?: string;
  userData?: Iuser;
}

const initialState: IauthState = {
  token: null,
  userData: null
};


export const getSavedToken = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SAVED_TOKEN)) || null;
  } catch (e) {
    console.log(e);
    return null;
  }
};


export const saveSessionToken = (token: string) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_SAVED_TOKEN, JSON.stringify(token));
  } catch (e) {
    console.log(e);
  }
};

export const destorySessionToken = () => {
  try {
    localStorage.setItem(LOCAL_STORAGE_SAVED_TOKEN, null);
  } catch (e) {
    console.log(e);
  }
};


const accountReducer = (state = initialState, action: any ) => {
  switch (action.type) {
    case LOGIN:
      saveSessionToken(action.payload.data.token);
      console.log(getSavedToken());
      return {
        ...state,
        token: action.payload.data.token
      };
    case LOGOUT:
      destorySessionToken();
      return {
        state: null
      };
    case RETRIEVE_TOKEN:
      return{
        ...state,
        token: getSavedToken()
      };
    case GET_USER_DATA:
      return{
        ...state,
        userData: action.payload.data
      };
    default:
      return state;
  }
};

export {
  accountReducer
};
