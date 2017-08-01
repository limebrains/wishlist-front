import axios from 'axios';
import {Config} from "../constants";

export const GET_USER_WISHLISTS = 'get_user_wishlists';
export const GET_WISHLIST_ITEMS = 'get_wishlist_item';
const {
    API_URL,
    WISHLISTS_URL,
    ITEM_URL,
} = Config;

export const getUserWishlists = (token:string ) => {
  const wishlists = axios.get(API_URL + WISHLISTS_URL, {
        headers: {Authorization: "Token " + token},
      }
  );
  return {
    payload: wishlists,
    type: GET_USER_WISHLISTS,
  }
};

export const getWishlistItems = (token:string, pk: number ) => {
  const items = axios.get(API_URL + WISHLISTS_URL + pk + '/' + ITEM_URL , {
        headers: {Authorization: "Token " + token},
      }
  );
  return {
    payload: items,
    pk: pk,
    type: GET_WISHLIST_ITEMS,
  }
};