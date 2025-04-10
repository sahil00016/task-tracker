// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

// Replace this with your actual Clerk publishable key (with quotes)
const PUBLISHABLE_KEY = "pk_test_cmFyZS1oYWRkb2NrLTYyLmNsZXJrLmFjY291bnRzLmRldiQ"; // Correctly enclosed in quotes

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
