import { api } from "@/utils/wrapApi";

export async function getReview(payload) {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews/${payload}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy đánh giá thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function createReview(payload) {
  try {
    const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      content: payload.content,
      rating: payload.rating,
      productId: payload.productId,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
