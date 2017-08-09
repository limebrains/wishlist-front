import * as React from 'react';
import '../layout.scss';
import LoginOrShow from "./index";

interface IProps {
  dispatch?: any;

}

export default class IndexPage extends React.Component<IProps, {}>  {

  public render() {
    return (
        <div className="container">
          <div className="row center">
            <h1>Your Wishlists</h1>
          </div>


          <div className="row">
            < LoginOrShow />
          </div>
        </div>

    );
  }
};

