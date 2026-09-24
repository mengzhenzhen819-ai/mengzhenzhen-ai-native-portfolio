import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=matrix-pdf-v2";
import "./styles.css?v=matrix-pdf-v2";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
