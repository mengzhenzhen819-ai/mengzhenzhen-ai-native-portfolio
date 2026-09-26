import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=incentive-bg-v6";
import "./styles.css?v=incentive-bg-v6";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
