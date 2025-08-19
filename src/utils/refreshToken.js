import { headers } from "next/headers";

export async function refreshToken(url, options = {}) {
  const defaultOptions = {
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    credentials: "include",
    ...options,
  };
  const response = await fetch(url, defaultOptions);
  if (response.status !== 401) {
    return response;
  }

  const skipRetryRoutes = ["/auth/login", "/auth/register", "/auth/refresh"];
  if (skipRetryRoutes.some((r) => url.includes(r))) {
    return response;
  }

  const refreshRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (refreshRes.ok) {
    const refreshData = await refreshRes.json();
    localStorage.setItem("access_token", refreshData.access_token);
    return await fetch(url, defaultOptions);
  } else {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
    throw new Error();
  }
}
