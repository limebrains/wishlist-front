import * as React from 'react';
import {StatelessComponent} from 'react';
import '../layout.scss';
import '../CSS/milligram.css';

interface ILayout {
    children: React.ComponentElement<any, any>;
}

const Navbar: StatelessComponent<ILayout> = ({children}): any => {
    return (
        <div className="page-container">
            <div className="row">
                <div className="column column-20">Navbar</div>
                <div className="column column-60 center">Navbar</div>
                <div className="column column-20 right">User</div>

            </div>

            <div className="row">
                {children}
            </div>

        </div>

    );
};

export default Navbar;
