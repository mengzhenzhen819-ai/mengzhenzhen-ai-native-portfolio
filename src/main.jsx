import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=project-galleries-v2";
import "./styles.css?v=project-galleries-v2";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
