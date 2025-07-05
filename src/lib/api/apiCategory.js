export async function getCategory() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy danh mục thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getCategoryById(params) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${params}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy danh mục thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
