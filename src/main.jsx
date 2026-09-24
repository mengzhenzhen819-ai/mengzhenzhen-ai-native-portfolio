import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=matrix-hires-v4";
import "./styles.css?v=matrix-hires-v4";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
