import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=lighthouse-gallery-assets";
import "./styles.css?v=lighthouse-gallery-assets";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
