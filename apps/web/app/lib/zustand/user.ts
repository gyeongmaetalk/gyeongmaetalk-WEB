import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Token = string | null;

interface RefreshTokenStore {
  refreshToken: Token;
  setRefreshToken: (refreshToken: Token) => void;
}

interface AccessTokenStore {
  accessToken: Token;
  setAccessToken: (accessToken: Token) => void;
}

export const useAccessTokenStore = create<AccessTokenStore>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken: Token) => set({ accessToken }),
}));

export const useRefreshTokenStore = create<RefreshTokenStore>()(
  persist(
    (set) => ({
      refreshToken: null,
      setRefreshToken: (refreshToken: Token) => set({ refreshToken }),
    }),
    {
      name: "refresh-token",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
