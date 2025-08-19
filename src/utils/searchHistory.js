// utils/searchHistory.js
export const saveSearchKeyword = (keyword) => {
  const key = "search_history";
  let history = JSON.parse(localStorage.getItem(key)) || [];
  const index = history.findIndex(
    (item) => item.toLowerCase() === keyword.toLowerCase()
  );
  if (index !== -1) {
    history.splice(index, 1);
  }
  history.unshift(keyword);
  if (history.length > 10) history = history.slice(0, 10);
  localStorage.setItem(key, JSON.stringify(history));
};

export const removeSearchKeyword = (keyword) => {
  const key = "search_history";
  let history = JSON.parse(localStorage.getItem(key)) || [];

  history = history.filter(
    (item) => item.toLowerCase() !== keyword.toLowerCase()
  );

  localStorage.setItem(key, JSON.stringify(history));
};

export const getSearchHistory = () => {
  return JSON.parse(localStorage.getItem("search_history")) || [];
};

export const clearSearchHistory = () => {
  localStorage.removeItem("search_history");
};

const formatSearch = (value) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const searchProduct = (value, productList) => {
  const listProduct = productList.filter((product) => {
    return formatSearch(product.name).includes(formatSearch(value).trim());
  });

  return listProduct;
};

//
