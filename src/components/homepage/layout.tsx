import * as React from 'react';
import {StatelessComponent} from 'react';
import '../layout.scss';
import '../CSS/milligram.css';
import {Link} from "react-router";
import LoginOrShow from "./index";

interface IProps {
  dispatch?: any;

}

export default class IndexPage extends React.Component<IProps, {}>  {

  public render() {
    return (
        <div className="container">
          <div className="row">
            <div className="column center">
              <h1>Welcome to Wishlist app</h1>
            </div>
          </div>

          <div className="center">

          < LoginOrShow />

          </div>
        </div>

    );
  }
};

