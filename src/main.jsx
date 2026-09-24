import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=project-galleries";
import "./styles.css?v=project-galleries";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
