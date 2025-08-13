"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { User, Lock, Gift, ShoppingBag } from "lucide-react";

import ProfileTab from "@/components/account/ProfileTab";
import PasswordTab from "@/components/account/PasswordTab";
import OrderTab from "@/components/account/OrderTab";
import VoucherTab from "@/components/account/VoucherTab";
import { getProfileUser } from "@/lib/api/apiUser";
import { getMyVoucher } from "@/lib/api/apiVoucher";
import { getOrderByUser } from "@/lib/api/apiOrder";
// import {
//   ProfileTab,
//   OrderTab,
//   PasswordTab,
//   VoucherTab,
// } from "@/components/account";

export default function AccountPage({}) {
  const searchParams = useSearchParams();

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab profile={data.profile} />;
      case "password":
        return <PasswordTab />;
      case "vouchers":
        return <VoucherTab vouchers={data.vouchers} />;
      case "orders":
        return <OrderTab orders={data.orders} />;
      default:
        return <ProfileTab profile={data.profile} />;
    }
  };
  const [activeTab, setActiveTab] = useState("profile");
  const tabs = [
    { id: "profile", label: "Thông tin cá nhân", icon: User },
    { id: "password", label: "Đổi mật khẩu", icon: Lock },
    { id: "vouchers", label: "Voucher của tôi", icon: Gift },
    { id: "orders", label: "Đơn hàng của tôi", icon: ShoppingBag },
  ];

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", activeTab);
    if (activeTab === "orders") {
      params.set("limit", "3");
    } else {
      params.delete("limit");
    }
    window.history.replaceState(null, "", `account?${params.toString()}`);
  }, [activeTab]);

  const [data, setData] = useState({
    profile: [],
    vouchers: [],
    orders: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, vouchers, orders] = await Promise.all([
          getProfileUser(),
          getMyVoucher(),
          getOrderByUser(),
        ]);
        setData({ profile, vouchers, orders });
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="h-full bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tài khoản của tôi
          </h1>
          <p className="text-gray-600 mt-2">
            Quản lý thông tin cá nhân và cài đặt tài khoản
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <div className="w-12 h-12 bg-main rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">User 3</h3>
                  <p className="text-sm text-gray-600">user3@gmail.com</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
