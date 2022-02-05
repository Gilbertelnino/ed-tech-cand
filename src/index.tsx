import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { hotjar } from "react-hotjar";
import { PersistGate } from "redux-persist/integration/react";
import "./assets/styles/app.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import lodashMixin from "./utils/lodashMixin"; // do not remove this
import store, { persistor } from "./store";


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {hotjar.initialize(2463911, 6)}
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("employHER")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
