import "./app.css";

import { isRouteErrorResponse, Links, Meta, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import { DefaultErrorComponent } from "./components/layout/default-error-component";
import { NotFoundComponent } from "./components/layout/not-found-component";
import RootProvider from "./components/layout/root-provider";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <RootProvider />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundComponent />;
  }

  let message = "Oops!";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = "Error";
  } else if (error && error instanceof Error) {
    stack = import.meta.env.DEV ? error.stack : undefined;
  }

  return (
    <DefaultErrorComponent message={message} stack={stack} />
  );
}
