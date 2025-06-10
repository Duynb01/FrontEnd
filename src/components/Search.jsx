"use client";
import { Search as SearchIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Trash2 } from "lucide-react";
import {
  removeSearchKeyword,
  saveSearchKeyword,
  getSearchHistory,
} from "@/utils/searchHistory";
import { useRef, useState, useEffect } from "react";

export default function Search() {
  const trendCategorize = [
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
      name: "Lọ hoa",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_7_img.jpg?v=91",
    },
    {
      name: "Khung ảnh",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_8_img.jpg?v=91",
    },
  ];
  const [keyword, setKeyword] = useState("");
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);
  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

  const handleSearch = (customKeyword) => {
    const searchTerm = (customKeyword ?? keyword).trim();
    if (!searchTerm) return;

    inputRef.current?.blur();
    saveSearchKeyword(searchTerm);
    setHistory(getSearchHistory());
    setKeyword(searchTerm);
    setIsOpen(false);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("search_history");
    setHistory([]);
  };
  return (
    <div className="flex-1 max-w-xl relative">
      {isOpen && (
        <div
          className="fixed inset-0 top-[57px] bg-black/40 z-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div ref={searchBoxRef}>
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => {
            setIsOpen(true);
          }}
          placeholder="Tìm kiếm sản phẩm..."
          className="text-gray font-medium w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-1 "
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
            <div className="search-modal absolute w-full h-[50vh] z-50 transform translate-y-2">
              <div className="search-content p-1 bg-white h-full flex flex-col gap-2 rounded-sm">
                <div className="max-h-[60%] flex-grow">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold">Lịch sử tìm kiếm</h4>
                    <button onClick={handleClearHistory}>Clear</button>
                  </div>
                  <div className="search-history flex flex-col items-center">
                    {history.length === 0 && <p>Chưa có lịch sử tìm kiếm</p>}
                    <ul className="w-full">
                      {history.map((item, i) => (
                        <li
                          className="group flex items-center justify-between gap-2 cursor-default hover:bg-gray-100 text-black rounded-sm"
                          key={i}
                          onClick={() => {
                            setKeyword(item);
                            handleSearch(item);
                          }}
                        >
                          <div>
                            {" "}
                            <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className="w-4 h-4 text-gray-400 px-1"
                            />{" "}
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
                  </div>
                </div>
                <div className="h-[40%] flex flex-col gap-2 max-h-full ">
                  <h4 className="font-bold">Danh Mục Nổi Bật</h4>
                  <div className="grid grid-cols-4 grid-rows-2 flex-grow">
                    {trendCategorize.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 rounded-sm"
                      >
                        <img
                          src={item.scr}
                          alt={item.name}
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
