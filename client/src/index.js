import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Context from "./components/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>,
);
