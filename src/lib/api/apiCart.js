export async function addCart(payload) {
  try {
    const { id, quantity } = payload;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        productId: id,
        quantity,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Thêm vào giỏ hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getCart() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy giỏ hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateCart(payload) {
  try {
    console.log(payload);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/${payload.cartItemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          quantity: payload.newQuantity,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chỉnh sửa thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteCart(payload) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/${payload}`,
      {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({ payload }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Xóa sản phẩm thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
