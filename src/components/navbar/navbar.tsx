import * as React from 'react';
import '../layout.scss';
import '../CSS/milligram.css';
import {connect} from "react-redux";
import {retrieveSessionToken, getUserData} from "../../actions/loginRegister";


interface UserJSON {
  pk: number;
  username: string;
  email: string;
}

interface IProps {
  dispatch?: any;
  route?: any;
  token?: string;
  userData?: UserJSON;
  getUserData?: any;
  retrieveSessionToken?: any;
}



interface IState {
  token?: string;
  userData?: UserJSON;
}

const mapStateToProps = (state: any): IProps => {
  return {
    token: state.accountReducer.token,
    userData: state.accountReducer.userData
  };
};

const mapDispatchToProps = {retrieveSessionToken, getUserData};

@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class TopBar extends React.Component<IProps, IState> {


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

  public render() {

    if (this.props.userData) {
      return (
          <div className="column column-20 right">
            Hello {this.props.userData['username']}!
          </div>
      );
    }
    else {
      return <div className="div">DUPA</div>
    }
  }
}
