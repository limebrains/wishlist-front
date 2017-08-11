import * as React from 'react';
import '../layout.scss';

import {connect} from "react-redux";
import {retrieveSessionToken, getUserData, logout} from "../../actions/loginRegister";
import {Iuser} from "../common/interfaces";
import { NavDropdown, MenuItem } from 'react-bootstrap';


interface IProps {
  dispatch?: any;
  route?: any;
  token?: string;
  userData?: Iuser;
  getUserData?: any;
  retrieveSessionToken?: any;
  logout?: any;
}

interface IState {
  token?: string;
  userData?: Iuser;
}


const mapStateToProps = (state: any): IProps => {
  return {
    token: state.accountReducer.token,
    userData: state.accountReducer.userData,
  };
};

const mapDispatchToProps = {retrieveSessionToken, getUserData, logout};

@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class LoginComponent extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
  }

  public componentWillMount(){
    if (!this.props.token){
      this.props.retrieveSessionToken();
    }
  }

  public componentDidUpdate(){
    if (!this.props.userData && this.props.token) {
      this.props.getUserData(this.props.token)
    }
  }


  public makeLogout = (e: any) => {
    this.props.logout();
  };

  public renderDropdownMenuAndUsername() {
    return (
        <div className="col-sm-3">
          <NavDropdown eventKey='1'
                       title={`Hello ${this.props.userData.username}!`}
                       id="login-dropdown">
            <MenuItem eventKey="3.1" onClick={this.makeLogout}>Logout</MenuItem>
          </NavDropdown>
        </div>
    );
  }


  public render() {
    if (this.props.userData) {
      return (
          this.renderDropdownMenuAndUsername()
      );
    }
      else return(<div className="col-sm-3" key="2137"></div>);
    }
}
