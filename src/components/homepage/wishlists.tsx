import * as React from 'react';
import '../layout.scss';
import '../CSS/milligram.css';
import '../CSS/loader.scss';

import {connect} from "react-redux";
import {getUserWishlists, dropdownWishlist} from "../../actions/wishlistsAndItems";
import {LoaderComponent} from "../common/loader";
import EventHandler = React.EventHandler;
import {Iwishlist} from "../common/interfaces";


interface IState {
  token?: string;
}

interface IProps {
  dispatch?: any;
  route?: any;
  token?: string;
  wishlists?: Iwishlist[];
  getUserWishlists?: any;
  getWishlistItems?: any;
  retrieveSessionToken?: any;
  dropdownWishlist?: any;

}

const mapStateToProps = (state: any): IProps => {
  return {
    token: state.accountReducer.token,
    wishlists: state.wishlistReducer.wishlists,
  };
};

const mapDispatchToProps = {getUserWishlists, dropdownWishlist};

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

  private expandWishlist = (id: number, wishlist:Iwishlist) => {

    return (e: any) => {
      const wishlists = this.props.wishlists;
      let index;

      for (let i = 0; i < wishlists.length; i++) {
        if (wishlists[i].pk === id){
          index = i;
        }
      }

      wishlist.expand = !wishlist.expand ;
      this.props.dropdownWishlist(index, wishlist);
    }

  };

  public renderItems = (wishlist:Iwishlist) => {
    return (
        <div className="">
          asdf
        </div>
    );
  };

  public renderWishlistDetails = (wishlist:Iwishlist) => {

    return (
        <div className="details" key={`details-${wishlist.pk}`}>
          <div className="wishlist-detail-info">
            {wishlist.owner.username}
            {wishlist.date_created}
            {wishlist.date_updated}
          </div>
          <div className="items">
            {this.renderItems(wishlist)}
          </div>

        </div>
    );
  };

  public renderWishlist = (wishlist: Iwishlist) => {
    return(
        <div className="wishlist" key={wishlist.pk}>
          <div className="wishlist-panel row">
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
                    onClick={this.expandWishlist(wishlist.pk, wishlist)}
              >
              &#8595;
          </span>

            </div>
          </div>
          {wishlist.expand && this.renderWishlistDetails(wishlist)}
        </div>

    );
  };

  public renderWishlists = () => {
    const {wishlists} = this.props;
    return(
        <div className="wishlists">
          {wishlists &&
          wishlists.map((wishlist: Iwishlist) => {
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