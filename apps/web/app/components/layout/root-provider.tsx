import { Toaster } from "@gyeongmaetalk/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Outlet } from "react-router";

import { queryClient } from "~/lib/tanstack";

import MswProvider from "./msw-provider";

const naverMapKey = import.meta.env.VITE_NAVER_MAP_KEY;
const naverMapScriptUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverMapKey}&submodules=geocoder`;

const RootProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <script type="text/javascript" src={naverMapScriptUrl} />
      <Outlet />
      <MswProvider />
      <Toaster position="bottom-center" duration={3000} closeButton />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default RootProvider;
