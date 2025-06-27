export async function createOrder(payload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Tạo đơn hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getOrderByUser() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/me`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy Đơn hàng thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
