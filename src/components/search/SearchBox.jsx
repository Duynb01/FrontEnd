"use client";
import { Search as SearchIcon } from "lucide-react";
import {
  saveSearchKeyword,
  getSearchHistory,
  searchProduct,
} from "@/utils/searchHistory";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { setProductWithSearch } from "@/redux/store/slices/searchSlice";
import SearchContent from "./SearchContent";
import Image from "next/image";

export default function Search() {
  const trendSearch = [
    {
      name: "Sofa",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_1_img.jpg?v=91",
    },
    {
      name: "Bàn",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_2_img.jpg?v=91",
    },
    {
      name: "Ghế",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_3_img.jpg?v=91",
    },
    {
      name: "Giường",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_4_img.jpg?v=91",
    },
    {
      name: "Nệm",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_5_img.jpg?v=91",
    },
    {
      name: "Đèn",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_6_img.jpg?v=91",
    },
    {
      name: "Bình hoa",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_7_img.jpg?v=91",
    },
    {
      name: "Khung tranh",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_8_img.jpg?v=91",
    },
  ];
  const [keyword, setKeyword] = useState("");
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState([]);
  const debounceSearch = useDebounce(keyword, 500);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product);
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Xử lý tắt overlay
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        inputRef.current?.blur();
        handleSearch(keyword);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Xử lý Search
  const handleInputSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const handleSearch = (customKeyword) => {
    const searchTerm = (customKeyword ?? keyword).trim();
    if (!searchTerm) {
      setIsOpen(false);
      return;
    }

    setKeyword(searchTerm);
    inputRef.current?.blur();
    setIsOpen(false);

    saveSearchKeyword(searchTerm);
    setHistory(getSearchHistory());

    const result = searchProduct(searchTerm, productList);

    dispatch(
      setProductWithSearch({
        key: searchTerm,
        products: result,
      })
    );

    router.push("/search");
  };

  // Xử lý xoá lịch sử tìm kiếm
  const handleClearHistory = () => {
    localStorage.removeItem("search_history");
    setHistory([]);
  };

  // Xử lý filter name
  useEffect(() => {
    setLoading(true);
    if (!debounceSearch.trim()) {
      setProduct([]);
      return;
    }
    const timeout = setTimeout(() => {
      const result = searchProduct(debounceSearch, productList);
      setProduct(result);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [debounceSearch, productList]);

  // Xử lý chọn sản phẩm trong box-search
  const handleChooseProduct = ({ name, id }) => {
    saveSearchKeyword(name);
    setHistory(getSearchHistory());
    setKeyword(name);
    setIsOpen(false);
    router.push(`/products/${id}`);
  };

  // Xử lý click vào tìm kiếm nổi bật
  const handleClickTrendSearch = (name) => {
    const result = searchProduct(name, productList);
    dispatch(
      setProductWithSearch({
        key: name,
        products: result,
      })
    );

    router.push("/search");
    setIsOpen(false);
  };
  return (
    <div className="max-w-xl  relative">
      {isOpen && (
        <div
          className="fixed inset-0 top-[66px] bg-black/40 z-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        ref={searchBoxRef}
        className=" relative w-[24rem] sm:w-[30rem]  mdc:w-[36rem]"
      >
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={handleInputSearch}
          onFocus={() => {
            setIsOpen(true);
          }}
          placeholder="Tìm kiếm sản phẩm..."
          className=" text-gray font-medium w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-1 "
        />
        <button
          onClick={() => {
            handleSearch(keyword);
          }}
          className="  text-main active:text-[#67031c] absolute top-2.5 right-4 cursor-pointer"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
        {isOpen && (
          <>
            <div className="search-modal absolute w-full h-[80vh] z-50 transform ">
              <div className="search-content p-1 bg-white h-full flex flex-col rounded-sm">
                <div className="h-[70%] w-full flex-grow overflow-hidden">
                  <div className="flex justify-between items-center p-2">
                    <h4 className="font-bold">Lịch sử tìm kiếm</h4>
                    <button
                      onClick={handleClearHistory}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Xoá tất cả
                    </button>
                  </div>
                  <div className="search-history flex flex-col p-2 h-[28.5rem] overflow-y-scroll scrollbar-none">
                    <SearchContent
                      keyword={keyword}
                      loading={loading}
                      products={products}
                      history={history}
                      handleChooseProduct={handleChooseProduct}
                      handleSearch={handleSearch}
                      setHistory={setHistory}
                    />
                  </div>
                </div>
                <div className="h-[30%] flex flex-col  max-h-full bg-white">
                  <h4 className="font-bold p-2">Tìm kiếm nổi bật</h4>
                  <div className="grid grid-cols-4 grid-rows-2 flex-grow">
                    {trendSearch.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => handleClickTrendSearch(item.name)}
                        className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 rounded-sm"
                      >
                        <Image
                          src={item.scr}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded-sm"
                        />
                        <span className="text-sm text-gray-500">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
