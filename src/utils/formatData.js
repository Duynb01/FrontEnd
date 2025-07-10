import dayjs from "dayjs";

const formatPrice = (price) => {
  if (!price || isNaN(price)) return "0₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatDate = (data) => {
  return dayjs(data).format("DD/MM/YYYY HH:mm");
};

const formatExpiryDate = (data) => {
  return dayjs(data).format("DD/MM/YYYY");
};

const formatDateType = (data) => {
  return dayjs(data).format("YYYY-MM-DD");
};

export { formatPrice, formatDate, formatExpiryDate, formatDateType };
