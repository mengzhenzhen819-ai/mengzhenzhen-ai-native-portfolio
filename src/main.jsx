import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=matrix-pages-v3";
import "./styles.css?v=matrix-pages-v3";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
