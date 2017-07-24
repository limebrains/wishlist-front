
import {GET_USER_WISHLISTS, GET_WISHLIST_ITEMS} from "../actions/wishlistsAndItems";



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
        wishlists: [...state.wishlists, action.payload.data.results ],

      };
    case GET_WISHLIST_ITEMS:
      return{
        ...state,
        items: [state.items, action.payload.data]
      };


    default:
      return state;
  }
};

export {
  wishlistReducer
};
