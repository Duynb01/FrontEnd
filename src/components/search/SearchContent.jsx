"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Trash2 } from "lucide-react";
import ProductBoxSearch from "./ProductBoxSearch";
import { removeSearchKeyword, getSearchHistory } from "@/utils/searchHistory";
import { Loader } from "lucide-react";

export default function SearchContent({
  keyword,
  loading,
  products,
  history,
  handleChooseProduct,
  handleSearch,
  setHistory,
}) {
  if (keyword.trim().length > 0) {
    if (loading)
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Loader className="w-6 h-6 animate-spin text-main" />
        </div>
      );
    if (products.length > 0) {
      return (
        <div className="flex flex-col gap-y-2 h-full">
          {products.map((item, i) => (
            <div key={i} onClick={() => handleChooseProduct(item)}>
              <ProductBoxSearch product={item} />
            </div>
          ))}
        </div>
      );
    }
    return (
      <p className="text-sm text-gray-500 text-center">
        Không tìm thấy kết quả
      </p>
    );
  }

  if (history.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center">
        Chưa có lịch sử tìm kiếm
      </p>
    );
  }

  return (
    <ul className="w-full">
      {history.map((item, i) => (
        <li
          key={i}
          className="group flex items-center justify-between gap-2 cursor-default hover:bg-gray-100 text-black rounded-sm"
          onClick={() => {
            handleSearch(item);
          }}
        >
          <div>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="w-4 h-4 text-gray-400 px-1"
            />
            {item}
          </div>
          <Trash2
            onClick={(e) => {
              e.stopPropagation();
              removeSearchKeyword(item);
              setHistory(getSearchHistory());
            }}
            className="w-4 h-4 text-gray-400 hidden group-hover:block mr-3"
          />
        </li>
      ))}
    </ul>
  );
}
