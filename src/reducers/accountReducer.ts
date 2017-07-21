import {LOGIN} from '../actions/loginRegister';
const localStorage = require('local-storage-fallback');

export const LOCAL_STORAGE_SAVED_TOKEN = "token";

interface IauthState {
  token?: string;
}

const initialState: IauthState = {
  token: null
};


export const getSavedToken = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SAVED_TOKEN)) || [];
  } catch (e) {
    console.log(e);
    return [];
  }
};


export const saveSessionToken = (token: string) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_SAVED_TOKEN, JSON.stringify(token));
  } catch (e) {
    console.log(e);
  }
};


const accountReducer = (state = initialState, action: any ) => {
    switch (action.type) {
    case LOGIN:
      saveSessionToken(action.payload.data.token);
      return {
        ...state,
        token: action.payload.data.token
      };
    default:
      return state;
  }
};

export {
  accountReducer
};
