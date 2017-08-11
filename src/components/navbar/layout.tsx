import * as React from 'react';
import {StatelessComponent} from 'react';
import '../layout.scss';
import LoginComponent from "./loginComponent";

interface ILayout {
  children: React.ComponentElement<any, any>;
}

const Navbar: StatelessComponent<ILayout> = ({children}): any => {
  return (
      <div className="page-container">
        <div className="navbar row ">
          <LoginComponent />
          <div className="col-sm-9 right">Welcome to Wishlist App</div>

        </div>
        <div className="row">
          {children}
        </div>

      </div>

  );
};

export default Navbar;
