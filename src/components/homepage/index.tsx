import * as React from 'react';
import '../layout.scss';
import {connect} from "react-redux";
import {Link} from "react-router";
import Wishlists from "./wishlists";

interface IProps {
  dispatch?: any;
  route?: any;
  token?: string;
  getUserData?: any;
  retrieveSessionToken?: any;
}

interface IState {
  token?: string;
}

const mapStateToProps = (state: any): IProps => {
  return {
    token: state.accountReducer.token,
  };
};

const mapDispatchToProps = {};


@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class LoginOrShow extends React.Component<IProps, IState> {

  public render() {
    if (!this.props.token){
      return(
          <div className="row row-center container">
            <h1>Welcome to wishlist app</h1>
          </div>
      );
    }
    else {
      return(<div className="container"><Wishlists /></div>)
    }
  }
}