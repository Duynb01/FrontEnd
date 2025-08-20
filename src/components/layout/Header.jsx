"use client";

import Link from "next/link";
import Image from "next/image";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import Search from "../search/SearchBox";
import { ShoppingCart, User } from "lucide-react";
import ButtonAccount from "../ButtonAccount";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Header() {
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
    <header className="shadow-sm top-0 z-40 bg-main w-screen fixed max-h-[118px]">
      <div className="max-w-7xl mx-auto  py-2 flex items-center justify-around mdc:justify-around xl:justify-between gap-4">
        <div className="mdc:hidden relative z-50">
          <NavMobile />
        </div>
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold text-white  items-center gap-2 mdc:flex hidden"
        >
          <Image
            src="/logo.svg"
            width={50}
            height={50}
            alt="Logo"
            className="mx-auto rounded-full  font-bold"
            priority
          />
          <span className="">FNS</span>
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
            <ButtonAccount />
          </div>
        </div>
      </div>

      {/* Menu chính */}
      <div>
        <NavDesktop />
      </div>
    </header>
  );
}
