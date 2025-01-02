/**
 * Check the docs for more information:
 * [Sentry Shared Environments / Browser Extensions]{@link https://docs.sentry.io/platforms/javascript/best-practices/shared-environments/}
 * */

import {
  BrowserClient,
  defaultStackParser,
  browserApiErrorsIntegration,
  breadcrumbsIntegration,
  globalHandlersIntegration,
  makeFetchTransport,
  Scope,
} from "@sentry/browser";
import { SENTRY_BASIC_CONFIG } from "../shared/sentry.configs";

export interface IsolatedSentry {
  scope: Scope;
}

let isolatedSentry: IsolatedSentry | null = null;

const getIsolatedSentry = (): IsolatedSentry => {
  if (!isolatedSentry) {
    const sentryClient = new BrowserClient({
      ...SENTRY_BASIC_CONFIG,
      transport: makeFetchTransport,
      stackParser: defaultStackParser,
      integrations: [
        browserApiErrorsIntegration(),
        breadcrumbsIntegration(),
        globalHandlersIntegration(),
      ],
    });

    const sentryScope = new Scope();
    sentryScope.setClient(sentryClient);
    sentryClient.init();

    isolatedSentry = {
      scope: sentryScope,
    };
  }

  return isolatedSentry;
};

export const sentry = getIsolatedSentry();
