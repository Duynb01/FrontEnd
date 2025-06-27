export async function getVoucher() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vouchers`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy Voucher thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getMyVoucher() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vouchers/me`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy Voucher thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function claimVoucher(payload) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vouchers/claim/${payload}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          voucherId: payload,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy Voucher thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function validVoucher(payload) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vouchers/${payload}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Xác thực Voucher thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
