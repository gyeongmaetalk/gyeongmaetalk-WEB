import { TanstackProvider } from "@gyeongmaetalk/lib/tanstack";
import { Toaster } from "@gyeongmaetalk/ui";

import { Outlet } from "react-router";

import FcmTokenProvider from "./fcm-token-provider";
import MixpanelProvider from "./mixpanel-provider";
import UserProvider from "./user-provider";

const naverMapKey = import.meta.env.VITE_NAVER_MAP_KEY;
const naverMapScriptUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverMapKey}&submodules=geocoder`;

const RootProvider = () => {
  return (
    <TanstackProvider>
      <script type="text/javascript" src={naverMapScriptUrl} />
      <UserProvider>
        <FcmTokenProvider>
          <Outlet />
        </FcmTokenProvider>
      </UserProvider>
      <Toaster position="bottom-center" duration={3000} closeButton />
      <MixpanelProvider />
    </TanstackProvider>
  );
};

export default RootProvider;
