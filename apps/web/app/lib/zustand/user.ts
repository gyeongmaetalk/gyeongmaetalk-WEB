import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { MyInfoResponse } from "~/models/auth";

type User = Omit<MyInfoResponse, "cellPhone" | "birth">;

interface UserStore {
  isRegistered: boolean | null;
  setIsRegistered: (isRegistered: boolean | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isRegistered: null,
      setIsRegistered: (isRegistered: boolean | null) => set({ isRegistered }),
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      user: null,
      setUser: (user: User | null) => set({ user }),
      reset: () => set({ isRegistered: false, isLoggedIn: false, user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
