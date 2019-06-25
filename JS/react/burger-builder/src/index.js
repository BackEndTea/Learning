import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";

import './index.css';
import App from "./App";

import reducer from "./store/reducer";

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log('[MW] Dispatching:', action);
      const result = next(action);
      console.log('[MD] Next state: ', store.getState());
      return result;
    };
  };
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
