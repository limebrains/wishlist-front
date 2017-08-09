import * as React from 'react';
import '../layout.scss';

import {connect} from "react-redux";
import {retrieveSessionToken, getUserData, login, logout} from "../../actions/loginRegister";
import {Iuser} from "../common/interfaces";
import { NavDropdown, MenuItem } from 'react-bootstrap';
import Modal from 'react-modal';
import LoginForm from "../login/login";


interface IProps {
  dispatch?: any;
  route?: any;
  token?: string;
  userData?: Iuser;
  getUserData?: any;
  retrieveSessionToken?: any;
  login?: any;
  logout?: any;
}

interface IState {
  token?: string;
  userData?: Iuser;
  modalIsOpen?: boolean;
  username?: string;
  password?: string;
}


const mapStateToProps = (state: any): IProps => {
  return {
    token: state.accountReducer.token,
    userData: state.accountReducer.userData,
  };
};

const mapDispatchToProps = {retrieveSessionToken, getUserData, login, logout};

@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class LoginComponent extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      modalIsOpen: false,
      username: '',
      password: '',

    };
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

  public openModal = () => {
    this.setState({modalIsOpen: true});
  };

  public closeModal = () => {
    this.setState({modalIsOpen: false});
  };


  public renderLogin() {

    return(
        <div className="col-sm-3">
          <span onClick={this.openModal}>Login</span> or register!
          <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal"
          >
            <LoginForm />

            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
    );
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
    else {
      return ( this.renderLogin() );
    }
  }
}
