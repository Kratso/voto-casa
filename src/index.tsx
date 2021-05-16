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
    <div className="main-container bp3-dark">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/">
              {
                !store.getState().isLoggedIn 
                  ? <Votaciones 
                      casas={[
                        {
                          nombre: "AAAA",
                          localizacion:"AAAA",
                          imagenes: ["AAAA"],
                          numeroDeHuespedes:1,
                          precio:2
                        },
                        {
                          nombre: "BBBB",
                          localizacion:"BBBB",
                          imagenes: ["BBBB"],
                          numeroDeHuespedes:1,
                          precio:2
                        }
                      ]}
                      updateCasas={(casas)=>console.log(casas)}
                   />
                  : <Login login={(userData)=>{console.log(userData)}} />
              }
            </Route>
            
            
          </Switch>
        </Router>
        
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


