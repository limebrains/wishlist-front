import {LOGIN} from '../actions/loginRegister';

interface IauthState {
  token?: string;
}

const initialState: IauthState = {
  token: null
};


const accountReducer = (state = initialState, action: any ) => {
    switch (action.type) {
    case LOGIN:
      console.log(action.payload);
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
