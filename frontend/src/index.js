import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "./Store.js";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
