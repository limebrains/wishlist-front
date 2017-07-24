import * as React from 'react';
import '../layout.scss';
import '../CSS/milligram.css';
import '../CSS/loader.scss';

import {connect} from "react-redux";
import {getUserWishlists} from "../../actions/wishlistsAndItems";
import {LoaderComponent} from "../common/loader";


interface IProps {
  dispatch?: any;
  route?: any;
  token?: string;
  wishlists?: any;
  getUserWishlists?: any;
  retrieveSessionToken?: any;
}

interface IState {
  token?: string;
}

const mapStateToProps = (state: any): IProps => {
  return {
    token: state.accountReducer.token,
    wishlists: state.wishlistReducer.wishlists,
  };
};

const mapDispatchToProps = {getUserWishlists};


@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Wishlists extends React.Component<IProps, IState> {

  public componentWillMount() {
    if(this.props.token){
      this.props.getUserWishlists(this.props.token);
    }
  }

  public renderWishlistDetail = () => {

  return (
      <div className="row">
        asdasf
      </div>
  );
  };

  public renderWishlist = (wishlist: any) => {
    return(
        <div className="wishlist-panel row column" key={wishlist.pk}>
          <div className="row">
            <span className="wishlist-name">{wishlist.name}</span>
          </div>
          <div className="row">
            <div className="column column-70">
              <span className="h7">{wishlist.description}</span>
              </div>
            <div className="column column-30 h7">
              {wishlist.items.length === 0 && ('There is no ')}
              {wishlist.items.length !== 0 && wishlist.items.length} items!
              </div>
          </div>
        </div>

    );
  };

  public renderWishlists = () => {
    const wishlists = this.props.wishlists[0];
    return(
        <div className="">
          {wishlists &&
          wishlists.map((wishlist: any) => {
            return this.renderWishlist(wishlist)
          })}
          {
            wishlists && wishlists.length === 0 && (<LoaderComponent />)
          }
        </div>

    );
  };

  public render() {
    return (
        <div className="row">
          <div className="column column-50">
            {this.renderWishlists()}
          </div>
          <div className="column column-50">
            {this.renderWishlistDetail()}
          </div>
        </div>
    );
  }
}