import "./App.css";

import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./router/routes";

import { UtilityProvider } from "./components/provider";

function App() {
  return (
    <UtilityProvider>
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </UtilityProvider>
  );
}

export default App;
