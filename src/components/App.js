import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from '../reducers';
import Header from './header';
import User from './User';
import UserNew from './UserNew';
import UserEdit from './UserEdit';
import Location from './Location'



const Dashboard = () => {return <div>Minha Dashboard</div>}
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


const App = () => {
    return (
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
    )
}

export default App;