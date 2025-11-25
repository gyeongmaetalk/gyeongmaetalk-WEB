import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const s3BaseUrl = "https://auctiontalk-s3.s3.ap-northeast-2.amazonaws.com";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      "/api/s3": {
        target: s3BaseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/s3/, ""),
      },
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      onLog(level, log, handler) {
        if (
          log.cause &&
          (log.cause as { message: string }).message === `Can't resolve original location of error.`
        ) {
          return;
        }
        handler(level, log);
      },
    },
  },
});
