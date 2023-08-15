import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// import { UtilityProvider } from "./components/provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <UtilityProvider> */}
    <App />
    {/* </UtilityProvider> */}
  </React.StrictMode>
);
