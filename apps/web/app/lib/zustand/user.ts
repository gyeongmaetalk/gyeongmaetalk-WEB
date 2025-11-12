import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { MyInfoResponse } from "~/models/auth";

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

type User = Omit<MyInfoResponse, "cellPhone" | "birth">;

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
