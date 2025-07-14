export async function getUser() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy danh sách thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getProfileUser() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy thông tin thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateProfile(payload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        infoDto: {
          name: payload.name,
          phone: payload.phone,
          address: payload.address,
        },
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
export async function updatePassword(payload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        passwordDto: {
          oldPassword: payload.currentPassword,
          newPassword: payload.newPassword,
        },
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateStatus(payload) {
  const { id, edit } = payload;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(edit),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
