import { api } from "@/utils/wrapApi";

export async function getCategory() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy danh mục thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getCategoryById(params) {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${params}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy danh mục thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
