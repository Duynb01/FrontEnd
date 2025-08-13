import { validVoucher } from "@/lib/api/apiVoucher";
import { formatDiscount, formatPrice } from "./formatData";

export const calculatePrice = (data) => {
  if (!data || !Array.isArray(data)) return 0;

  return data.reduce((total, item) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10);
    if (isNaN(price) || isNaN(quantity)) return total;
    return total + price * quantity;
  }, 0);
};

export const validateVoucher = async (code) => {
  if (!code) return formatPrice(0);
  try {
    const dataVoucher = await validVoucher(code);
    return formatDiscount(dataVoucher);
  } catch (err) {
    console.log("Error validating voucher:", err.message);
  }
};
