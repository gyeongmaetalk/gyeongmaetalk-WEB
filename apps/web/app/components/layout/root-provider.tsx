import { TanstackProvider } from "@gyeongmaetalk/lib/tanstack";
import { Toaster } from "@gyeongmaetalk/ui";

import { Outlet } from "react-router";

import MswProvider from "./msw-provider";

const naverMapKey = import.meta.env.VITE_NAVER_MAP_KEY;
const naverMapScriptUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverMapKey}&submodules=geocoder`;

const RootProvider = () => {
  return (
    <TanstackProvider>
      <script type="text/javascript" src={naverMapScriptUrl} />
      <Outlet />
      <MswProvider />
      <Toaster position="bottom-center" duration={3000} closeButton />
    </TanstackProvider>
  );
};

export default RootProvider;
