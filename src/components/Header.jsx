"use client";

import Link from "next/link";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import Search from "./Search";
import { Menu, Heart, ShoppingCart, User } from "lucide-react";

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
  const onShowMenu = () => {
    console.log("show menu Vào đây");
  };
  return (
    <header className="shadow-sm sticky top-0 z-40 bg-main w-screen">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <Menu className="w-8 h-8 text-white mdc:hidden" onClick={onShowMenu} />
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          BAYA
        </Link>

        {/* Search Bar */}
        <Search />

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="mdc:flex flex-col items-center text-sm text-white hover:cursor-pointer active:text-black hidden "
          >
            <User className="w-5 h-5" />
            <span>Tài khoản</span>
          </Link>
          <Link
            href="/wishlist"
            className="flex flex-col items-center text-sm text-white hover:cursor-pointer active:text-black"
          >
            <Heart size={32} className=" mdc:w-5 mdc:h-5" />
            <span className="hidden mdc:block">Yêu thích</span>
          </Link>
          <Link
            href="/cart"
            className="flex flex-col items-center text-sm text-white hover:cursor-pointer active:text-black"
          >
            <ShoppingCart size={32} className=" mdc:w-5 mdc:h-5" />
            <span className="hidden mdc:block">Giỏ hàng</span>
          </Link>
        </div>
      </div>

      {/* Menu chính */}
      <div>
        <NavDesktop categories={categories} />
        <NavMobile categories={categories} />
      </div>
    </header>
  );
}
