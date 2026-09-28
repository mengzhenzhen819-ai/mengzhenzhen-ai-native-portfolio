import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=signin-gallery-v9";
import "./styles.css?v=signin-gallery-v9";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
