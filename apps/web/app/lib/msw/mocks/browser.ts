import { setupWorker } from "msw/browser";

import { consultHandlers } from "./handlers/consult";
import { reviewHandlers } from "./handlers/review";

export const worker = setupWorker(...reviewHandlers, ...consultHandlers);
