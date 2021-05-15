import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './services/store';
import { Provider } from 'react-redux';
import { 
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';
import { Login } from './components/login/Login';
import { Votaciones } from './components/votos/Votacion'
 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
        <Route path="/">
            {store.getState().isLoggedIn 
              ? <Votaciones />
              : <Login />
            }
          </Route>
          
          
        </Switch>
      </Router>
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


