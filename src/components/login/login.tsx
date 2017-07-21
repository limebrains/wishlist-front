import * as React from 'react';
import '../layout.scss';
import '../CSS/milligram.css';
import {login} from "../../actions/loginRegister";
import {browserHistory} from "react-router";
import {connect} from "react-redux";


interface IProps {
  dispatch?: any;
  login?: any;
  route?: any;
  token?: string;
}

interface IState {
  username?: string;
  password?: string;
}


const mapStateToProps = (state: any): IProps => {
  return {
  token: state.accountReducer.token
  };
};


const mapDispatchToProps = {login};

@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class LoginForm extends React.Component<IProps, IState>  {

  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  public handleChange = (event: any): void =>{
    this.setState({...this.state, [event.target.name]: event.target.value });
  };

  public makelogin = (event: any): void => {
    event.preventDefault();
    const {username, password} = this.state;
    this.props.login(username, password);
    browserHistory.push('/');
  };

  public render() {
    return (
        <div className="container">
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
        </div>

    );
  }
};
