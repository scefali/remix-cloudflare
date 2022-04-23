import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";

interface Loader {
  timestamp: number;
}

export const loader = async (): Promise<Loader> => {
  return { timestamp: Date.now() };
};

export default function Test() {
  const { timestamp } = useLoaderData<Loader>();
  const [diffTime, setDiffTime] = useState<number | null>(null);
  useEffect(() => {
    const clientTime = Date.now();
    setDiffTime(clientTime - timestamp);
  }, [timestamp]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Test</h1>
      {diffTime ? <div>Time Diff {diffTime}</div> : null}
    </div>
  );
}
