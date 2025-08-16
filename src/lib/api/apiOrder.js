import { api } from "@/utils/wrapApi";
async function createOrder(payload) {
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

async function getOrderByUser() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/me`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy Đơn hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function getOrder() {
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

async function getOrderById(id) {
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

async function cancelOrder(id) {
  try {
    const res = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/cancel`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Hủy đơn hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function updateOrderStatus(id, status) {
  try {
    const res = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
      { status }
    );
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || "Cập nhật trạng thái thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export {
  createOrder,
  getOrderByUser,
  getOrder,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
};
