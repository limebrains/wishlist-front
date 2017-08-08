const update = require('react-addons-update');
import {GET_USER_WISHLISTS, GET_WISHLIST_ITEMS, DROPDOWN_WISHLIST} from "../actions/wishlistsAndItems";
import {Iwishlist} from "../components/common/interfaces";

interface IauthState {
  wishlists: Iwishlist[],
  items: any
}

const initialState: IauthState = {
  wishlists: [],
  items: []
};


const wishlistReducer = (state = initialState, action: any ) => {
  switch (action.type) {

    case GET_USER_WISHLISTS:
      let wishlists = [...action.payload.data.results];
        for (let index = 0; index <  wishlists.length; index++) {
          wishlists[index]['expand'] = false;
        }

      return{
        ...state,
        wishlists: [...state.wishlists, ...wishlists ],

      };

    case GET_WISHLIST_ITEMS:
      return{
        ...state,
        items: [state.items, action.payload.data]
      };

    case DROPDOWN_WISHLIST:
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
