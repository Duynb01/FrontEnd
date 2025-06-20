export async function getReview(payload) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews/product/${payload}`,
      {
        method: "GET",
        credentials: "include",
      }
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content: payload.content,
        rating: payload.rating,
        productId: payload.productId,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
