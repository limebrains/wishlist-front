import * as React from 'react';
import {StatelessComponent} from 'react';
import '../layout.scss';
import '../CSS/milligram.css';
import LoginComponent from "./loginComponent";

interface ILayout {
  children: React.ComponentElement<any, any>;
}

const Navbar: StatelessComponent<ILayout> = ({children}): any => {
  return (
      <div className="page-container">
        <div className="navbar row ">
          <div className="column column-30">Navbar</div>
          <div className="column column-40 center">Welcome to Wishlist App</div>
          <LoginComponent />
        </div>
        <div className="row">
          {children}
        </div>

      </div>

  );
};

export default Navbar;
