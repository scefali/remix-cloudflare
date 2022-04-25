import { json } from "@remix-run/cloudflare";
import type { KVNamespace } from "@cloudflare/workers-types";
import { useLoaderData } from "@remix-run/react";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://975529a39d8547cb8baec8d5f782c425@o1218253.ingest.sentry.io/6360278",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
// declare const remixcloudflare: KVNamespace;

export const action = async ({ request }) => {
  try {
    // why is request.body a ReadableStream?
    // const reader = request.body.getReader();
    // const data = await reader.read();
    const data = await request.json();
    console.log("data", data, DATAENTRY);
    await DATAENTRY.put(data.field, data.value);
    return json({ message: "ok" });
  } catch (err) {
    Sentry.captureException(err);
    throw err;
  }
};
