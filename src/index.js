import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import { ToastContainer,  toast } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <App />
        <ToastContainer />
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
