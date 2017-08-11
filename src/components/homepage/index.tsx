import * as React from 'react';
import '../layout.scss';
import {connect} from "react-redux";
import Wishlists from "./wishlists";
import LoginForm from "../Forms/LoginForm";
import {login} from "../../actions/loginRegister";
import {Modal, Button} from 'react-bootstrap';
import {openModal, closeModal} from "../../actions/modals";
import {Imodal} from '../common/interfaces';

interface IProps {
  dispatch?: any;
  route?: any;
  token?: string;
  getUserData?: any;
  retrieveSessionToken?: any;
  login?: any;
  openModal?: any;
  closeModal?: any;
  modal?: Imodal;
  ModalLogin?: string; //magic, do not touch. For unknow reasons modal won't render without it
}

interface IState {
  token?: string;
}

const mapStateToProps = (state: any): IProps => {
  return {
    token: state.accountReducer.token,
    ModalLogin: state.modalsReducer.modals['login'],
    modal: state.modalsReducer.modals,
  };
};

const mapDispatchToProps = {login, openModal, closeModal};


@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class LoginOrShow extends React.Component<IProps, IState> {

  public makelogin = (values: {username: string, password: string}): void => {
    this.props.login(values.username, values.password);
    if(this.props.token){
      this.props.closeModal('login')
    }
  };

  public componentWillReceiveProps() {
    console.log('MODAL', this.props.modal);
  }

  public openLoginModal = () => {
    console.log(this.props);
    this.props.openModal('login')

  };

  public closeLoginModal = () => {
    console.log(this.props);
    this.props.closeModal('login')
  };

  public loginModal = () => {
    return (
        <Modal show={this.props.modal['login']} onHide={this.closeLoginModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <div className="row center">
            <LoginForm onSubmit={this.makelogin} />
          </div>
          <Modal.Footer>
            <Button onClick={this.closeLoginModal}>Close</Button>
          </Modal.Footer>

        </Modal>
    );

  };



  public render() {
    if (!this.props.token){
      return(
          <div className="container">
            <div className="row wishlist center welcome-panel">
              <h1>Welcome to wishlist app!</h1>
              <div className="row">
                <h3>
                  <span className="click-activator" onClick={this.openLoginModal}>Sign in</span> or <span className="click-activator">Sign up</span>!
                  {this.loginModal()}</h3>
              </div>
            </div>
          </div>
      );
    }
    else {
      return(<div className="container"><Wishlists /></div>)
    }
  }
}