"use client";

import Link from "next/link";
import Image from "next/image";
import NavDesktop from "../NavDesktop";
import NavMobile from "../NavMobile";
import Search from "../search/SearchBox";
import { ShoppingCart, User } from "lucide-react";
import Account from "../Account";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
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
  const { isCheckLogin } = useSelector((state) => state.auth);
  const router = useRouter();
  const routerCart = (e) => {
    e.preventDefault();
    if (isCheckLogin) {
      router.push("/cart");
    } else {
      toast.warning("Vui lòng đăng nhập");
    }
  };

  return (
    <header className="shadow-sm top-0 z-40 bg-main w-screen fixed h-[118px]">
      <div className="max-w-7xl mx-auto  py-2 flex items-center justify-around mdc:justify-around xl:justify-between gap-4">
        <div className="mdc:hidden relative z-50">
          <NavMobile categories={categories} />
        </div>
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold text-white flex items-center gap-2"
        >
          <Image
            src="/logo.svg"
            width={50}
            height={50}
            alt="Logo"
            className="mx-auto rounded-full  font-bold"
            priority
          />
          <span className="md:block hidden">FNS</span>
        </a>

        {/* Search Bar */}
        <Search />

        {/* Icons */}
        <div className="flex items-center gap-6">
          <button
            onClick={routerCart}
            className="flex flex-col items-center text-sm text-white hover:cursor-pointer active:text-black"
          >
            <ShoppingCart size={32} className=" mdc:w-5 mdc:h-5" />
            <span className="hidden mdc:block">Giỏ hàng</span>
          </button>
          <div className="hidden mdc:block">
            <Account />
          </div>
        </div>
      </div>

      {/* Menu chính */}
      <div>
        <NavDesktop categories={categories} />
      </div>
    </header>
  );
}
