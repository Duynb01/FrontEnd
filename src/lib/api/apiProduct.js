import { api } from "@/utils/wrapApi";

export async function getProduct() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getProductById(params) {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${params}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
