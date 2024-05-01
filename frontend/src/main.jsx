import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { DrawerProvider } from "./context/DrawerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DrawerProvider>
          <App />
        </DrawerProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
