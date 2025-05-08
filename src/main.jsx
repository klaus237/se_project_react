import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // New import
import "./index.css";
import App from "./components/App/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/se_project_react">
      <App />
    </BrowserRouter>
  </StrictMode>
);
