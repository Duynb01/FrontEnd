"use client";

import { logoutUser } from "@/lib/api/apiAuth";
import { setLogout } from "@/redux/store/slices/authSlice";
import { deleteProfile } from "@/redux/store/slices/userSlice";
import { Loader, LogOutIcon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ButtonAccount() {
  const router = useRouter();
  const closeRef = useRef(null);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const { isCheckLogin } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);
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
        dispatch(deleteProfile());
        localStorage.removeItem("isLogin");
        localStorage.removeItem("orderList");
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

  const handleToAccount = () => {
    const checkLogin = localStorage.getItem("isLogin");
    if (!checkLogin) {
      toast.warning("Vui lòng đăng nhập!");
      return;
    }
    setIsLogin(false);
    router.push("/account");
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
            <li
              onClick={handleToAccount}
              className="cursor-pointer  py-[10px] px-4  min-w-[10.25rem] w-full hover:bg-slate-300 "
            >
              Quản lý tài khoản
            </li>
            <li
              onClick={handleLogout}
              className=" flex items-center justify-center gap-2 cursor-pointer  py-[10px] px-4 hover:bg-slate-300 min-w-[10.25rem] w-full "
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
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
