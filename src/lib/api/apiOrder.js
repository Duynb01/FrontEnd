import { api } from "@/utils/wrapApi";
export async function createOrder(payload) {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      payload
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Tạo đơn hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getOrderByUser() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/me`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy Đơn hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getOrder() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || "Lấy danh sách đơn hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getOrderById(id) {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`
    );
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || "Lấy thông tin đơn hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
