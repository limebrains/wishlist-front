/* React */
import * as React from 'react';
import { StatelessComponent } from 'react';

/* React Router */
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router } from 'react-router';

/* Router dependencies preparing */
import { history, store } from './prepare';

/* App configs */
import config from './config';

/* Components */
import { NotFound } from './components';
import IndexPage from "./components/homepage/layout";
import Navbar from './components/navbar/layout';
import LoginForm from "./components/login/login";

/* Routes */
const { urlPrefix } = config;
const Routes: StatelessComponent<any> = (): any => {
    return (
        <Provider store={ store }>
            <Router history={ history }>
                <Route path={ urlPrefix } component={Navbar}>
                    <IndexRoute component= {IndexPage} />
                    <Route path="/login" component={ LoginForm } />
                </Route>
                <Route path="*" component={ NotFound } />
            </Router>
        </Provider>
    );
};

export default Routes;
