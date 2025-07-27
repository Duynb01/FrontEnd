import { api } from "@/utils/wrapApi";

export async function registerUser(payload) {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      payload
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Đăng ký thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function loginUser(payload) {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      payload
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function logoutUser() {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function reloadUser() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/reload`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lỗi! Vui lòng đăng nhập lại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function loginGoogle(payload) {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
      { token: payload }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
