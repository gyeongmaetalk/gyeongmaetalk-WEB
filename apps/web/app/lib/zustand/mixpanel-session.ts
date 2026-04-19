import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface MixpanelSessionState {
  loginPending: boolean;
  consultFormStartedAtMs: number | null;
  matchingResultViewedAtMs: number | null;
  setLoginPending: (value: boolean) => void;
  setConsultFormStartedAtNow: () => void;
  setMatchingResultViewedAtNow: () => void;
  getDurationSinceMatchingResultViewedMs: () => number;
}

export const useMixpanelSessionStore = create<MixpanelSessionState>()(
  persist(
    (set, get) => ({
      loginPending: false,
      consultFormStartedAtMs: null,
      matchingResultViewedAtMs: null,
      setLoginPending: (value: boolean) => {
        set({ loginPending: value });
      },
      setConsultFormStartedAtNow: () => {
        set({ consultFormStartedAtMs: Date.now() });
      },
      setMatchingResultViewedAtNow: () => {
        set({ matchingResultViewedAtMs: Date.now() });
      },
      getDurationSinceMatchingResultViewedMs: (): number => {
        const at: number | null = get().matchingResultViewedAtMs;
        return at !== null ? Date.now() - at : 0;
      },
    }),
    {
      name: "mixpanel-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state: MixpanelSessionState) => ({
        loginPending: state.loginPending,
        consultFormStartedAtMs: state.consultFormStartedAtMs,
        matchingResultViewedAtMs: state.matchingResultViewedAtMs,
      }),
    }
  )
);
