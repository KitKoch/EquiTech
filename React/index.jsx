import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "toastr/build/toastr.min.css";
import reportWebVitals from "./utils/reportWebVitals";
import Main from "./Main";

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
serviceWorker.unregister();
