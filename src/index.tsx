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
import "react-responsive-carousel/lib/styles/carousel.min.css";


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
                          nombre: "Apartamento en Mogro - Playa de Usíl",
                          localizacion:"Mogro, Cantabria",
                          imagenes: ["https://a0.muscache.com/im/pictures/55a45e16-93b9-4509-9880-ee35f0c41946.jpg?im_w=1200", "https://a0.muscache.com/im/pictures/e04201be-1a3c-424d-aa61-5fe9345d5fd8.jpg?im_w=720", "https://a0.muscache.com/im/pictures/c3ff31b8-556f-49bc-81b4-09809e94cc17.jpg?im_w=720"],
                          numeroDeHuespedes:4,
                          precio:95
                        },
                        {
                          nombre: "Cabaña Pasiega El refugio del Yuso",
                          localizacion:"Vega de Pas, Cantabria",
                          imagenes: ["https://a0.muscache.com/im/pictures/42c635ae-c24a-4592-8fe6-3ac73652101b.jpg?im_w=1200", "https://a0.muscache.com/im/pictures/7fd07d8e-2fb6-4215-8398-84d310c61252.jpg?im_w=720", "https://a0.muscache.com/im/pictures/b8dc0016-e326-44e0-9a83-f7aef532d184.jpg?im_w=720"],
                          numeroDeHuespedes:4,
                          precio:125
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


