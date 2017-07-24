import * as React from 'react';
import '../layout.scss';
import '../CSS/milligram.css';
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
          <div className="row row-center">
            <div className="column ">
              <Link to="/login">
                <button className="button">login</button>
              </Link>
              <strong> or </strong>
              <button className="button button-outline">
                register
              </button>
            </div>
          </div>
      );
    }
    else {
      return(<div className="column column-100"><Wishlists /></div>)
    }
  }
}