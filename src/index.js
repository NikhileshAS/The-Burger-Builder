import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import burgerbuilder from "./redux/reducers/burgerBuilder";
import order from "./redux/reducers/order";
import auth from "./redux/reducers/auth";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ burger: burgerbuilder, order: order, auth: auth }),
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
