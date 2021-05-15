import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import { Login } from './Login';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            {store.getState().isLoggedIn 
              ? <App />
              : <Login />
            }
          </Route>
        </Switch>
      </Router>
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


