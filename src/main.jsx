import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=matrix-title-v7";
import "./styles.css?v=matrix-title-v7";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
