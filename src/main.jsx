import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=matrix-vector-v5";
import "./styles.css?v=matrix-vector-v5";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
