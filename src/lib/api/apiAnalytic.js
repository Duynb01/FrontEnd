import { api } from "@/utils/wrapApi";
async function getPerformance() {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/analytics/category-performance`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy thông tin thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}
async function getMonthRevenue() {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/analytics/monthly-revenue`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lấy thông tin thất bại");
    return data;
  } catch (err) {
    throw err;
  }
}

export { getPerformance, getMonthRevenue };
