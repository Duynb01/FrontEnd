import { api } from "@/utils/wrapApi";
async function createVNPayPayment(orderId, paymentMethod, totalPrice) {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/vnpay-create`,
      {
        orderId,
        method: paymentMethod,
        amount: totalPrice,
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Thanh toán thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
async function createPayment(orderId, paymentMethod, totalPrice) {
  try {
    const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
      orderId,
      method: paymentMethod,
      amount: totalPrice,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Thanh toán thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

async function verifyPayment(queryString) {
  console.log(queryString);

  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/vnpay-return?${queryString}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Thanh toán thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export { createVNPayPayment, createPayment, verifyPayment };
