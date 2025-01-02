import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";
import "./sentry-react.config";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SentryErrorBoundary>
      <App />
    </SentryErrorBoundary>
  </StrictMode>
);
