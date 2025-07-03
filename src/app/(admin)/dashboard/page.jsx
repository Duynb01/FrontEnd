"use client";

import React, { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  DollarSign,
  TrendingUp,
  Eye,
  Plus,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  Gift,
} from "lucide-react";
import DashboardTab from "@/components/admin/Dashboard";
import ProductTab from "@/components/admin/ProductTab";
import VoucherTab from "@/components/admin/VoucherTab";
import OrderTab from "@/components/admin/OrderTab";
import CustomerTab from "@/components/admin/CustomerTab";
import AnalyticTab from "@/components/admin/AnalyticTab";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [title, setTitle] = useState("Dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "products", label: "Sản phẩm", icon: Package },
    { id: "vouchers", label: "Voucher", icon: Gift },
    { id: "orders", label: "Đơn hàng", icon: ShoppingCart },
    { id: "customers", label: "Khách hàng", icon: Users },
    { id: "analytics", label: "Thống kê", icon: BarChart3 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "products":
        return <ProductTab />;
      case "vouchers":
        return <VoucherTab />;
      case "orders":
        return <OrderTab />;
      case "customers":
        return <CustomerTab />;
      case "analytics":
        return <AnalyticTab />;
      default:
        return <DashboardTab />;
    }
  };

  const handleToTab = (tab) => {
    setActiveTab(tab);
    const { label } = menuItems.find((item) => item.id === tab);
    setTitle(label);
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">FurniAdmin</span>
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
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
