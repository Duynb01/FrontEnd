import { api } from "@/utils/wrapApi";

async function addCart(payload) {
  try {
    const { id, quantity } = payload;
    const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
      productId: id,
      quantity,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Thêm vào giỏ hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function getCart() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/carts`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy giỏ hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function updateCart(payload) {
  try {
    const res = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/${payload.cartItemId}`,
      {
        quantity: payload.newQuantity,
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function removeItemCart(payload) {
  try {
    const res = await api.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/${payload}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Xóa sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export { addCart, getCart, updateCart, removeItemCart };
