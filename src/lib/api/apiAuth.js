import { api } from "@/utils/wrapApi";
async function registerUser(payload) {
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

async function loginUser(payload) {
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

async function logoutUser() {
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

async function reloadUser() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/reload`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lỗi! Vui lòng đăng nhập lại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function loginGoogle(payload) {
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

async function forgotPassword(email) {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      { email }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error");
    return data;
  } catch (err) {
    throw err;
  }
}

async function resetPassword(params) {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        email: params.email,
        token: params.token,
        newPassword: params.newPassword,
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error");
    return data;
  } catch (err) {
    throw err;
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  loginGoogle,
  reloadUser,
  forgotPassword,
  resetPassword,
};
