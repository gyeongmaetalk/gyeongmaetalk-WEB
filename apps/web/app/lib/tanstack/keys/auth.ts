export const authKeys = {
  all: ["auth"] as const,
  getMyInfo: () => [...authKeys.all, "getMyInfo"] as const,
};
