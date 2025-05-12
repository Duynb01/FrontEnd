const formatPrice = (price) => {
  const num = Number(price);
  if (!isNaN(num)) {
    return (
      Math.round(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₫"
    );
  }
  return "";
};
export { formatPrice };
