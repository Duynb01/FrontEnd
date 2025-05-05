"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, User, ChevronDown } from "lucide-react";

export default function Header() {
  const categories = [
    {
      name: "Sofa - ghế thư giãn",
      path: "sofa-ghe-thu-gian",
      childs: ["Sofa", "Ghế thư giãn", "Đệm ngồi"],
    },
    {
      name: "Bàn",
      path: "/products/ban",
      childs: [
        "Bàn ăn",
        "Bàn trà",
        "Bàn làm việc",
        "Bàn học",
        "Bàn trang điểm",
        "Bàn góc",
        "Bàn ngoài trời",
        "Bộ bàn ghế đá",
      ],
    },
    {
      name: "Ghế",
      path: "/products/ghe",
      childs: [
        "Ghế ăn",
        "Ghế đôn",
        "Ghế văn phòng",
        "Ghế làm việc",
        "Ghế trẻ em",
        "Ghế học",
        "Ghế thư giãn",
      ],
    },
    {
      name: "Giường - Nệm",
      path: "/products/giuong-nem",
      childs: ["Giường ngủ", "Nệm", "Nệm Yoga"],
    },
    {
      name: "Tủ - Kệ",
      path: "/products/tu-ke",
      childs: [
        "Tủ quần áo",
        "Kệ tivi",
        "Kệ sách",
        "Tủ đầu giường",
        "Tủ kệ giày",
        "Tủ ngăn kéo",
      ],
    },
    {
      name: "Nội thất văn phòng",
      path: "/products/noi-that-van-phong",
      childs: [
        "Bàn làm việc",
        "Ghế văn phòng",
        "Tủ hồ sơ",
        "Dụng cụ văn phòng",
      ],
    },
    {
      name: "Trang trí",
      path: "/products/trang-tri",
      childs: [
        "Lọ hoa - Bình hoa",
        "Gương treo tường",
        "Gương đứng",
        "Nến thơm",
        "Đồng hồ",
      ],
    },
    {
      name: "Nhà bếp",
      path: "/products/nha-bep",
      childs: [
        "Tô - Chén - Đĩa",
        "Bộ ly cốc",
        "Ấm trà - Bộ ấm trà",
        "Dụng cụ nấu nướng",
        "Giá đỡ - Dụng cụ đựng",
        "Khăn trải bàn",
        "Găng tay - Tạp dề",
      ],
    },
    {
      name: "Phòng tắm",
      path: "/products/phong-tam",
      childs: ["Thảm phòng tắm", "Rèm tắm", "Vật dụng phòng tắm"],
    },
  ];
  return (
    <header className="shadow-sm sticky top-0 z-50 bg-main w-screen">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          BAYA
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="text-gray font-medium w-full border border-gray-300 rounded-full px-4 py-2 bg-white focus:outline-none focus:ring-1 "
          />
          <button className="  text-main active:text-[#67031c] absolute top-2.5 right-4 cursor-pointer">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="flex flex-col items-center text-sm text-white hover:cursor-pointer active:text-black"
          >
            <User className="w-5 h-5" />
            <span>Tài khoản</span>
          </Link>
          <Link
            href="/wishlist"
            className="flex flex-col items-center text-sm text-white hover:cursor-pointer active:text-black"
          >
            <Heart className="w-5 h-5" />
            <span>Yêu thích</span>
          </Link>
          <Link
            href="/cart"
            className="flex flex-col items-center text-sm text-white hover:cursor-pointer active:text-black"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Giỏ hàng</span>
          </Link>
        </div>
      </div>

      {/* Menu chính */}
      <nav className="bg-gray-100 ">
        <ul className="max-w-7xl mx-auto px-4  flex flex-wrap items-center gap-x-6 text-sm font-medium text-gray-700 justify-center">
          {categories.map((category, index) => (
            <li
              className="relative group min-h-[52px] flex items-center"
              key={index}
            >
              <Link
                href={category.path}
                className=" flex items-center text-main uppercase py-2"
              >
                {category.name}
                <ChevronDown className="w-4 h-4 inline-block transform transition-transform duration-300 group-hover:rotate-180 text-main" />
              </Link>
              {/*Menu phụ*/}
              <ul
                className="absolute min-w-[220px] shadow-[0px_6px_15px_rgb(0,0,0,0.2)] left-0 top-full bg-white opacity-0 translate-y-8 pointer-events-none transform transition duration-300 ease 
  group-hover:opacity-100 group-hover:translate-y-[0.5px] group-hover:pointer-events-auto"
              >
                {category.childs.map((child, index) => (
                  <li
                    key={index}
                    className={`py-[9px] px-[18px] overflow-hidden cursor-pointer hover:font-bold ${
                      index !== category.childs.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    {child}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
