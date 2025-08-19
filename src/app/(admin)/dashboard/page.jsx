"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Menu,
  X,
  Gift,
  RefreshCw,
  Loader,
  LogOutIcon,
  HomeIcon,
} from "lucide-react";
import {
  Dashboard,
  ProductTab,
  VoucherTab,
  OrderTab,
  CustomerTab,
} from "@/components/admin";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getCategory } from "@/lib/api/apiCategory";
import { setCategory } from "@/redux/store/slices/categorySlice";
import { setLogout } from "@/redux/store/slices/authSlice";
import { deleteProfile } from "@/redux/store/slices/userSlice";
import { logoutUser } from "@/lib/api/apiAuth";

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState("Dashboard");
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState(currentTab);
  const dispatch = useDispatch();
  const closeRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "products", label: "Sản phẩm", icon: Package },
    { id: "vouchers", label: "Voucher", icon: Gift },
    { id: "orders", label: "Đơn hàng", icon: ShoppingCart },
    { id: "customers", label: "Khách hàng", icon: Users },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductTab />;
      case "vouchers":
        return <VoucherTab />;
      case "orders":
        return <OrderTab />;
      case "customers":
        return <CustomerTab />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategory();
        if (categories) dispatch(setCategory(categories));
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", activeTab);
    window.history.replaceState(null, "", `dashboard?${params.toString()}`);
  }, [activeTab]);

  const handleToTab = (tab) => {
    setActiveTab(tab);
    const { label } = menuItems.find((item) => item.id === tab);
    setTitle(label);
  };

  const [isShow, setIsShow] = useState(false);
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
        setIsShow(false);
        router.push("/");
      }
    } catch (e) {
      toast.error(e.message || "Lỗi Đăng xuất!");
    } finally {
      setLoading(false);
    }
  };

  const handleToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    const wrapContent = closeRef.current;
    function handleClickOutside(event) {
      if (wrapContent && !wrapContent.contains(event.target)) {
        setIsShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prop to Tab
  return (
    <div className="wrap-content min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleToHome}
          >
            <Image
              src="/logo.svg"
              width={50}
              height={50}
              alt="Logo"
              className="mx-auto rounded-full font-bold"
              priority
            />
            <span className="text-xl font-bold text-slate-800">FurAdmin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleToTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 mb-2 ${
                  activeTab === item.id
                    ? "gradient text-white shadow-lg transform scale-105"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
            </div>
            {/* Button */}
            <div ref={closeRef}>
              <div
                onClick={() => {
                  setIsShow(!isShow);
                }}
                className="flex items-center gap-2 border border-slate-300 px-3 py-1 rounded-md cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Admin
                </span>
              </div>
              {isShow && (
                <div className="absolute  right-4 z-[9999]">
                  <ul className="bg-white shadow-md rounded-sm flex flex-col">
                    <li
                      onClick={() => {
                        router.push("/");
                      }}
                      className=" flex items-center justify-center gap-2 cursor-pointer  py-[10px] px-4 hover:bg-slate-300 min-w-[10.25rem] w-full "
                    >
                      <HomeIcon />
                      Trang chủ
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
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">{renderTabContent()}</main>
      </div>
    </div>
  );
}
