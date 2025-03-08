import { useEffect, useRef, useState } from "react";
import { captureException } from "@sentry/react";
import { feedbackIntegration } from "@sentry/react";
// import { feedbackIntegration } from "@sentry/browser";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const elFeedbackContainer = useRef(null);

  const [bugReportForm, setBugReportForm] = useState<{
    open: () => void;
  } | null>(null);

  useEffect(() => {
    const feedback = feedbackIntegration({
      autoInject: false,
      colorScheme: "light",
      showBranding: false,
      showName: false,
      showEmail: false,
      enableScreenshot: false,
      isNameRequired: false,
      isEmailRequired: false,
    });

    feedback.attachTo(elFeedbackContainer.current!);

    feedback
      .createForm()
      .then((newForm) => {
        setBugReportForm(newForm);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(
          "Failed to create sentry bug reporting integration widget",
          error
        );
      });
  }, []);

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

        <button
          ref={elFeedbackContainer}
          onClick={() => {
            bugReportForm?.open();
          }}
        >
          Report a bug
        </button>
      </div>
    </>
  );
}

export default App;
