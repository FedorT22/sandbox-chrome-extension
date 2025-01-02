import { sentry } from "./sentry";

console.log("⚽️ service-worker is up and running!");

function produceSentryErrorFromServiceWorker(): void {
  try {
    console.error("❌ Sentry Error in produceSentryErrorFromServiceWorker");
    throw new Error("❌ Sentry Error in produceSentryErrorFromServiceWorker");
  } catch (error) {
    sentry.scope.captureException(error);
  }
}

produceSentryErrorFromServiceWorker();

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
