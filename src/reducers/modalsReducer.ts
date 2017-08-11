import {SHOW_MODAL, HIDE_MODAL} from "../actions/modals";

interface IauthState {
  modals: any,
}


const initialState: IauthState = {
  modals: {},
};

const modalsReducer = (state = initialState, action: any ) => {
  switch (action.type) {

    case SHOW_MODAL:
      state.modals[action.payload] = true;
      return{
        ...state,
        modals: state.modals,
      };

    case HIDE_MODAL:
      state.modals[action.payload] = false;
      return{
        ...state,
        modals: state.modals,
      };

    default:
      return state;
  }
};

export {
  modalsReducer
};