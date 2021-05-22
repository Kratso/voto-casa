import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './services/store';
import { Provider } from 'react-redux';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Content from './Content';



ReactDOM.render(
  <React.StrictMode>
    <div className="main-container bp3-dark">
      <Provider store={store}>
        <Content />        
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


