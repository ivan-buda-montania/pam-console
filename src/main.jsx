import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ensureSeed } from "./services/storage";

// Siembra localStorage (categorías + overrides) antes del primer render.
ensureSeed();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
