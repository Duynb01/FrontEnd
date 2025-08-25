import { api } from "@/utils/wrapApi";

export async function getUser() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy danh sách thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getProfileUser(id) {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy thông tin thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateProfile(payload) {
  try {
    const res = await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      infoDto: {
        name: payload.name,
        phone: payload.phone,
        address: payload.address,
      },
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
    const res = await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      passwordDto: {
        oldPassword: payload.currentPassword,
        newPassword: payload.newPassword,
      },
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
    const res = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/status`,
      edit
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteUser(id) {
  try {
    const res = await api.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
