import { create } from "zustand";

import type { MyInfoResponse } from "~/models/auth";

type User = Omit<MyInfoResponse, "cellPhone" | "birth">;

interface UserStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  user: null,
  setUser: (user: User | null) => set({ user }),
}));
