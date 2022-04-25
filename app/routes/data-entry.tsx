import { json } from "@remix-run/cloudflare";
import type { KVNamespace } from "@cloudflare/workers-types";
import { useLoaderData } from "@remix-run/react";

// declare const remixcloudflare: KVNamespace;

export const action = async ({ request }) => {
  // why is request.body a ReadableStream?
  // const reader = request.body.getReader();
  // const data = await reader.read();
  const data = await request.json();
  console.log("data", data, DATAENTRY);
  await DATAENTRY.put(data.field, data.value);
  return json({ message: "ok" });
};
