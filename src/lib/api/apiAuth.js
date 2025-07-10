export async function registerUser(payload) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
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

export async function logoutUser() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function reloadUser() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reload`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lỗi! Vui lòng đăng nhập lại");
    return data;
  } catch (err) {
    throw err;
  }
}
