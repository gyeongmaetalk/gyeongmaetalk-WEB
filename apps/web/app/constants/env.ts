export const ENV = {
  IS_PROD: process.env.NODE_ENV === "production",
} as const;
