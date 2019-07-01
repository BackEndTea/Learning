import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from "react-redux";
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from "redux";
import thunk from 'redux-thunk';

import './index.css';
import App from "./App";

import burgerReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

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
const composeEnhancers = process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
  null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer,
  auth: authReducer,
});


const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
