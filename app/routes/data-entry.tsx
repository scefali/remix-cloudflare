import { json } from "@remix-run/cloudflare";
import type { KVNamespace } from "@cloudflare/workers-types";
import { useLoaderData } from "@remix-run/react";
import * as Sentry from "@sentry/react";

declare const DATAENTRY: KVNamespace;

Sentry.init({
  dsn: "https://6f1e9f8dd238407185b0ecea0e2bbb51@o1218253.ingest.sentry.io/6360265",
});

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
    console.error(err)
    Sentry.captureException(err);
    throw err;
  }
};
