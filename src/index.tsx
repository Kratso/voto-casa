import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
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
          <Route exact path="/">
            {store.getState().isLoggedIn 
              ? <App />
              : <Login />
            }
          </Route>
          <Route exact path="/votacion">
            {store.getState().isLoggedIn 
              ? <App />
              : <Votaciones />
            }
          </Route>
          
        </Switch>
      </Router>
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


