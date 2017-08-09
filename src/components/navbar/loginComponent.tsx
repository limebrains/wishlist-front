import * as React from 'react';
import '../layout.scss';
import '../CSS/milligram.css';

import {browserHistory} from "react-router";
import {connect} from "react-redux";
import {retrieveSessionToken, getUserData, login} from "../../actions/loginRegister";
import {Iuser} from "../common/interfaces";
import { NavDropdown, MenuItem } from 'react-bootstrap';
import Modal from 'react-modal';


interface IProps {
  dispatch?: any;
  route?: any;
  token?: string;
  userData?: Iuser;
  getUserData?: any;
  retrieveSessionToken?: any;
  login?: any;
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

const mapDispatchToProps = {retrieveSessionToken, getUserData, login};

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

  public handleChange = (event: any): void =>{
    this.setState({...this.state, [event.target.name]: event.target.value });
  };

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

  public makelogin = (event: any): void => {
    event.preventDefault();
    const {username, password} = this.state;
    this.props.login(username, password);
    if(this.props.token){
      browserHistory.push('/');
    }
  };


  public renderLogin() {

    return(
        <div className="column column-30 right">
          <span onClick={this.openModal}>Login</span> or register!
          <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal"
          >
            <h2>Login</h2>
            <div className="row row-center center">
              <div className="column column-60">
                <form onSubmit={this.makelogin}>
                  <fieldset>
                    <label htmlFor="nameField">Username</label>
                    <input type="text" name="username" onChange={this.handleChange} />
                    <label htmlFor="passwordField">Password</label>
                    <input type="password" name="password" onChange={this.handleChange} />
                    <div className="center">
                      <input type="submit"
                             value="Login"
                             className="button-primary"
                      />
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>

            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
    );
  }

  public renderDropdownMenuAndUsername() {
    return (
        <div className="col-sm-3">
          <NavDropdown eventKey='1'
                       title={`Hello ${this.props.userData.username}!`}
                       id="login-dropdown">
            <MenuItem eventKey="3.1">Logout</MenuItem>


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
