import ky from "ky";

const API_TIMEOUT = 10000; // 10초

export const instance = ky.create({
  timeout: API_TIMEOUT,
  retry: 0,
});
