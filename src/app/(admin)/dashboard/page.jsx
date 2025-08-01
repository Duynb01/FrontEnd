"use client";
import React, { use, useEffect, useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Menu,
  X,
  Gift,
  RefreshCw,
} from "lucide-react";
import {
  Dashboard,
  ProductTab,
  VoucherTab,
  OrderTab,
  CustomerTab,
} from "@/components/admin";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/api/apiUser";
import { getOrder } from "@/lib/api/apiOrder";
import { toast } from "react-toastify";
import { getVoucher } from "@/lib/api/apiVoucher";
import { getProduct } from "@/lib/api/apiProduct";

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [title, setTitle] = useState("Dashboard");

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
        return (
          <Dashboard
            users={data.users}
            orders={data.orders}
            products={data.products}
          />
        );
      case "products":
        return <ProductTab fetchData={fetchVoucher} products={data.products} />;
      case "vouchers":
        return <VoucherTab fetchData={fetchVoucher} vouchers={data.vouchers} />;
      case "orders":
        return <OrderTab fetchData={fetchOrder} orders={data.orders} />;
      case "customers":
        return (
          <CustomerTab
            fetchData={fetchUser}
            users={data.users}
            orders={data.orders}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  const handleToTab = (tab) => {
    setActiveTab(tab);
    const { label } = menuItems.find((item) => item.id === tab);
    setTitle(label);
  };

  const [isShow, setIsShow] = useState(false);
  const handleLogout = () => {
    setIsShow(!isShow);
    console.log("Logout clicked");
  };

  const handleToHome = () => {
    router.push("/");
  };

  // Prop to Tab
  const [data, setData] = useState({
    users: [],
    orders: [],
    vouchers: [],
    products: [],
  });
  const fetchUser = async () => {
    try {
      const users = await getUser();
      if (users) setData((prev) => ({ ...prev, users: users }));
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchVoucher = async () => {
    try {
      const vouchers = await getVoucher();
      if (vouchers) setData((prev) => ({ ...prev, vouchers: vouchers }));
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchOrder = async () => {
    try {
      const orders = await getOrder();
      if (orders) setData((prev) => ({ ...prev, orders: orders }));
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchProduct = async () => {
    try {
      const products = await getProduct();
      if (products) setData((prev) => ({ ...prev, products: products }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchOrder();
    fetchVoucher();
    fetchProduct();
  }, []);

  const handleRefresh = () => {
    fetchUser();
    fetchOrder();
    fetchVoucher();
    fetchProduct();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
              className="mx-auto rounded-full  font-bold"
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
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-50 transition-colors flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Làm mới
              </button>
              <div
                onClick={handleLogout}
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
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Đăng xuất
                  </button>
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
