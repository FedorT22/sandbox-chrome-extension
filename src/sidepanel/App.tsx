import { useState } from "react";
import { captureException } from "@sentry/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function produceUncaughtSentryErrorFromSidePanel(): void {
    throw new Error(
      "❌ Sentry Uncaught Error in produceUncaughtSentryErrorFromSidePanel"
    );
  }

  function produceSentryErrorFromSidePanel(): void {
    try {
      console.error("❌ Sentry Error in produceSentryErrorFromSidePanel");
      throw new Error("❌ Sentry Error in produceSentryErrorFromSidePanel");
    } catch (error) {
      captureException(error);
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={produceSentryErrorFromSidePanel}>
          Produce sentry error from sidePanel
        </button>

        <button onClick={produceUncaughtSentryErrorFromSidePanel}>
          Produce uncaught sentry error from sidePanel
        </button>
      </div>
    </>
  );
}

export default App;
