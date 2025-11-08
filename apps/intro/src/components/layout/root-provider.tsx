"use client";

import { TanstackProvider } from "@gyeongmaetalk/lib/tanstack";
import { Toaster } from "@gyeongmaetalk/ui";

import Footer from "./footer";
import Header from "./header";

interface RootProviderProps {
  children: React.ReactNode;
}

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <TanstackProvider>
      <Header />
      {children}
      <Footer />
      <Toaster position="top-center" richColors />
    </TanstackProvider>
  );
}
