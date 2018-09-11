import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from '../reducers';
/*import Header from './header';
import User from '../views/Users/User';
import UserNew from '../views/Users/UserNew';
import UserEdit from '../views/Users/UserEdit';
import Location from './Location'*/

import '../App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set

import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// Import Main styles for this application
import '../scss/style.css'

// Containers
import { DefaultLayout } from '../containers';
// Pages
import { Login, Page404, Page500, Register } from '../views/Pages';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


const App = () => {
    /*return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <Route>
                    <div>
                        <Header />
                        <div className="container-fluid">
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/localidade" component={Location} />
                            <Route exact path="/user" component={User} />
                            <Route path="/user/new" component={UserNew} />
                            <Route path="/user/edit/:id" component={UserEdit} />
                        </div>
                    </div>
                </Route>
            </BrowserRouter>
        </Provider>
    )*/
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
        <HashRouter >
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </HashRouter>
        </Provider>
    );
}

export default App;