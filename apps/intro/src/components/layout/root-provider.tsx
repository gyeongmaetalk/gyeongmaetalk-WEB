"use client";

import { TanstackProvider } from "@gyeongmaetalk/lib/tanstack";
import { Toaster } from "@gyeongmaetalk/ui";

interface RootProviderProps {
  children: React.ReactNode;
}

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <TanstackProvider>
      {children}
      <Toaster position="top-center" richColors />
    </TanstackProvider>
  );
}
