import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?v=ai-cards-click-v1";
import "./styles.css?v=ai-cards-click-v1";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
