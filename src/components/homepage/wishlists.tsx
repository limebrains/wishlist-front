import * as React from 'react';
import '../layout.scss';
import '../CSS/milligram.css';
import '../CSS/loader.scss';

import {connect} from "react-redux";
import {getUserWishlists} from "../../actions/wishlistsAndItems";
import {LoaderComponent} from "../common/loader";
import EventHandler = React.EventHandler;


interface IProps {
  dispatch?: any;
  route?: any;
  token?: string;
  wishlists?: any;
  getUserWishlists?: any;
  getWishlistItems?: any;
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

  constructor(props: any) {
    super(props);
    this.state = {

    };
  }


  public componentWillMount() {
    if(this.props.token){
      this.props.getUserWishlists(this.props.token);
    }
  }

  private expandWishlist = (wishlist: any) => {

    return (e: any) => {
      const wishlists = this.props.wishlists[0];
      console.log(wishlists.length);
      for (let i = 0; i < wishlists.length; i++) {
        if (wishlists[i].pk === wishlist.pk){
          console.log(wishlists[i]);
        }
      }
    }

  };

  public renderWishlistDetail = () => {

    return (
        <div className="row">
        </div>
    );
  };

  public renderWishlist = (wishlist: any) => {
    return(
        <div className="wishlist-panel row" key={wishlist.pk}>
          <div className="column column-30">
            <span className="wishlist-name">{wishlist.name}</span>
          </div>
          <div className="column column-30 wishlist-description">
            <span className="h7">{wishlist.description}</span>
          </div>
          <div className="column column-40 h7 right">
            {wishlist.items.length === 0 && ('There is no ')}
            {wishlist.items.length !== 0 && wishlist.items.length} items!

            <span className="dropdown-arrow"
                  onClick={this.expandWishlist(wishlist)}
            >
              &#8595;
          </span>

          </div>


        </div>

    );
  };

  public renderWishlists = () => {
    const wishlists = this.props.wishlists[0];
    return(
        <div className="wishlists">
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
          <div className="column column-100">
            {this.renderWishlists()}
            <div className="row">
            </div>
          </div>
        </div>
    );
  }
}