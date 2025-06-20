"use client";

import { logoutUser } from "@/lib/api/apiAuth";
import { setLogout } from "@/redux/store/slices/authSlice";
import { Loader, LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Account() {
  const router = useRouter();
  const closeRef = useRef(null);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const { isCheckLogin, userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (closeRef.current && !closeRef.current.contains(event.target)) {
        setIsLogin(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await logoutUser();
      if (res.status === "success") {
        dispatch(setLogout());
        localStorage.removeItem("isLogin");
        toast.success(res.message || "Đăng xuất thành công!");
        setIsLogin(false);
        router.push("/");
      }
    } catch (e) {
      toast.error(e.message || "Lỗi Đăng xuất!");
    } finally {
      setLoading(false);
    }
  };
  const handleCheckLogin = () => {
    if (!isCheckLogin) {
      router.push("/login");
    } else {
      setIsLogin(!isLogin);
    }
  };
  return (
    <div className="relative" ref={closeRef}>
      <button
        onClick={handleCheckLogin}
        className=" relative flex flex-col items-center text-sm text-white hover:cursor-pointer active:text-black"
      >
        <User size={32} className=" mdc:w-5 mdc:h-5" />
        <span className="hidden mdc:block">
          {userInfo?.name || "Đăng nhập"}
        </span>
      </button>
      {isLogin && (
        <div className="absolute top-[3.3rem] -right-9 z-[9999]">
          <ul className="bg-white shadow-md rounded-sm flex flex-col">
            <li className="cursor-pointer  py-[10px] px-4  min-w-[10.25rem] w-full hover:bg-slate-300 ">
              <Link href="/account" className="block w-full">
                Quản lý tài khoản
              </Link>
            </li>
            <li className="cursor-pointer  py-[10px] px-4 hover:bg-slate-300 min-w-[10.25rem] w-full ">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full sm:w-auto "
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    Đăng xuất...
                  </div>
                ) : (
                  <>
                    <LogOutIcon />
                    Đăng xuất
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
