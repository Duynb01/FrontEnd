import { refreshToken } from "./refreshToken";

export const api = {
  get: (url) => refreshToken(url),
  post: (url, data) =>
    refreshToken(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  patch: (url, data) =>
    refreshToken(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  delete: (url, data = "") =>
    refreshToken(url, {
      method: "DELETE",
      body: JSON.stringify(data),
    }),
};
