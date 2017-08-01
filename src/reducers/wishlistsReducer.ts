const update = require('react-addons-update');
import {GET_USER_WISHLISTS, GET_WISHLIST_ITEMS, DROPDOWN_WISHLIST} from "../actions/wishlistsAndItems";



interface IauthState {
  wishlists: any,
  items: any
}

const initialState: IauthState = {
  wishlists: [],
  items: []
};


const wishlistReducer = (state = initialState, action: any ) => {
  switch (action.type) {

    case GET_USER_WISHLISTS:
      return{
        ...state,
        wishlists: [...state.wishlists, ...action.payload.data.results ],

      };

    case GET_WISHLIST_ITEMS:
      return{
        ...state,
        items: [state.items, action.payload.data]
      };

    case DROPDOWN_WISHLIST:
      console.log('vol 1: ', ...state.wishlists.slice(0, action.id));

      console.log('vol 2: ', ...state.wishlists.slice(action.id+1))
      return{
        wishlists: [
          ...state.wishlists.slice(0, action.id),
          ...action.payload,
          ...state.wishlists.slice(action.id+1)
        ]
      };





    default:
      return state;
  }
};

export {
  wishlistReducer
};
