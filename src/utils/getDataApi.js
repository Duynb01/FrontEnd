const { getOrder } = require("@/lib/api/apiOrder");
const { getProduct } = require("@/lib/api/apiProduct");
const { getUser } = require("@/lib/api/apiUser");
const { getVoucher } = require("@/lib/api/apiVoucher");

export const fetchAllData = async () => {
  try {
    const [users, orders, vouchers, products] = await Promise.all([
      getUser(),
      getOrder(),
      getVoucher(),
      getProduct(),
    ]);

    return {
      users: users || [],
      orders: orders || [],
      vouchers: vouchers || [],
      products: products || [],
    };
  } catch (error) {
    throw new Error(error.message || "Có lỗi xảy ra khi lấy dữ liệu");
  }
};
