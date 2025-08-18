import { api } from "@/utils/wrapApi";

async function getProduct() {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function getProductById(id) {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function updateProduct(params) {
  console.log(params);

  const { id, edit } = params;
  try {
    const res = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      edit
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(id) {
  try {
    const res = await api.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function createUrlImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "myshop");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function createProduct(payload) {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      payload
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Tạo mới thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export {
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createUrlImage,
};
