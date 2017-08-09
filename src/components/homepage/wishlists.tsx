import * as React from "react";
import "../layout.scss";
import "../CSS/loader.scss";
import {connect} from "react-redux";
import {getUserWishlists, dropdownWishlist} from "../../actions/wishlistsAndItems";
import {LoaderComponent} from "../common/loader";
import {Iwishlist} from "../common/interfaces";
import EventHandler = React.EventHandler;


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

  public renderItems = (item:any) => {
    return (
        <div className="item-details" key={item.pk}>
          <div className="item-name center">{item.name}</div>

        </div>
    );
  };

  public renderWishlistDetails = (wishlist:Iwishlist) => {

    return (
        <div className="details" key={`details-${wishlist.pk}`}>
          <div className="wishlist-detail-info">
            Created by <b>{wishlist.owner.username}</b> on {wishlist.date_created}. Last updated: {wishlist.date_updated}
          </div>
          <div className="items">
            {wishlist.items &&
            wishlist.items.map((item: any) => {
              return this.renderItems(item)
            })}
          </div>
        </div>
    );
  };

  public renderWishlist = (wishlist: Iwishlist) => {
    return(
          <div className="wishlist" key={wishlist.pk}>
            <div className="row">
              <div className="wishlist-panel col-xs-12">
                <div className="row ">
                    <div className="col-sm-4">
                      <span className="wishlist-name">{wishlist.name}</span>
                    </div>
                    <div className="col-sm-4 wishlist-description">
                      {wishlist.description}
                    </div>
                    <div className="col-sm-4 right">
                      {wishlist.items.length === 0 && ('There is no ')}
                      {wishlist.items.length !== 0 && wishlist.items.length} items!

                      <span className="dropdown-arrow"
                            onClick={this.expandWishlist(wishlist.pk, wishlist)}
                      >
              &#8595;
          </span>
                    </div>
                  </div></div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                {wishlist.expand && this.renderWishlistDetails(wishlist)}
              </div>
            </div>
          </div>

    );
  };

  public renderWishlists = () => {
    const {wishlists} = this.props;
    return(
        <div>
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
        <div>
          {this.renderWishlists()}
        </div>
    );
  }
}