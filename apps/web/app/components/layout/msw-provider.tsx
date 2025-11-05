import { useEffect } from "react";

import { isProduction } from "~/utils/env";

async function enableMocking() {
  if (isProduction) {
    return;
  }

  const { worker } = await import("~/lib/msw/mocks/browser");

  return worker.start();
}

export default function MswProvider() {
  useEffect(() => {
    // enableMocking();
  }, []);

  return null;
}
