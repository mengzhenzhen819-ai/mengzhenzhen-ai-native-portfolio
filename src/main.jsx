import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=lighthouse-copy-v8";
import "./styles.css?v=lighthouse-copy-v8";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
