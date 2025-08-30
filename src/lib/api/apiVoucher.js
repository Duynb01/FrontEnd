import { api } from "@/utils/wrapApi";

async function getVoucher() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/vouchers`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy Voucher thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function getMyVoucher() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/vouchers/me`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy Voucher thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function claimVoucher(payload) {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/vouchers/${payload}/claim`,
      {
        voucherId: payload,
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy Voucher thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function validVoucher(payload) {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/vouchers/${payload}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Xác thực Voucher thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function updateVoucher(payload) {
  const { id, edit } = payload;
  try {
    const res = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/vouchers/${id}`,
      edit
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
async function createVoucher(payload) {
  try {
    const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/vouchers`, {
      name: payload.name,
      code: payload.code.toUpperCase(),
      discount: Number(payload.discount),
      type: payload.type.toUpperCase(),
      startDate: payload.startDate,
      expiryDate: payload.expiryDate,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Tạo mới thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
async function deleteVoucher(id) {
  try {
    const res = await api.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/vouchers/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Xóa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export {
  getVoucher,
  getMyVoucher,
  claimVoucher,
  validVoucher,
  updateVoucher,
  createVoucher,
  deleteVoucher,
};
