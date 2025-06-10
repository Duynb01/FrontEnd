// const API_URL = "http://localhost:4000"; // hoặc backend URL thực tế

export async function registerUser(payload) {
  try {
    const res = await fetch(`http://localhost:4000/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Đăng ký thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function loginUser(payload) {
  try {
    const res = await fetch(`http://localhost:4000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
