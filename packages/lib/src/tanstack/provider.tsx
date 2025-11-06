import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./instance";
import { DevtoolsPanelOptions, ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface TanstackProviderProps {
  children: React.ReactNode;
  devtoolsOptions?: DevtoolsPanelOptions;
}

export function TanstackProvider({ children, devtoolsOptions }: TanstackProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools {...devtoolsOptions} />
    </QueryClientProvider>
  );
}
