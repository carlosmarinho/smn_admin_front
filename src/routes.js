import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}


const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});


const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

const UserNew = Loadable({
    loader: () => import('./views/Users/UserNew'),
    loading: Loading,
  });

const UserEdit = Loadable({
  loader: () => import('./views/Users/UserEdit'),
  loading: Loading,
});



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
 
  { path: '/user', exact: true,  name: 'Usuário', component: Users },
  { path: '/user/edit/:id', exact: true, name: 'Edição de Usuário', component: UserEdit },
  { path: '/user/new', exact: true,  name: 'Criação de Usuário', component: UserNew },
];

export default routes;
