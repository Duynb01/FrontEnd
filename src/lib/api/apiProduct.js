"use client";

export async function getProduct() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getOneProduct(params) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${params}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
