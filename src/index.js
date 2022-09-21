import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
import './index.css';
import { Provider } from 'react-redux';
import store from "./store"
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/admin' render={props => <Layout {...props} />}></Route>
        <Redirect path='/' to='/admin/home'></Redirect>
      </Switch>
    </HashRouter>
  </Provider>

  , document.getElementById('root'));

// serviceWorker.unregister();