import { formatPrice } from "@/utils/formatData";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function DashboardTab({ users, orders, products }) {
  const totalRevenue = orders.reduce((total, item) => total + item.total, 0);
  const totalOrder = orders.length;
  const totalProduct = products.length;
  const totalUser = users.length;
  const stats = [
    {
      title: "Khách hàng",
      value: totalUser,
      icon: Users,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
    },
    {
      title: "Sản phẩm",
      value: totalProduct,
      icon: Package,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      title: "Đơn hàng",
      value: totalOrder,
      icon: ShoppingCart,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Tổng doanh thu",
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
  ];
  const recentOrders = [
    {
      id: "#12345",
      customer: "Nguyễn Văn A",
      product: "Sofa Da Thật",
      amount: "₫25,000,000",
      status: "Đang xử lý",
    },
    {
      id: "#12346",
      customer: "Trần Thị B",
      product: "Bàn Ăn Gỗ Sồi",
      amount: "₫8,500,000",
      status: "Đã giao",
    },
    {
      id: "#12347",
      customer: "Lê Văn C",
      product: "Tủ Quần Áo",
      amount: "₫12,000,000",
      status: "Đang giao",
    },
    {
      id: "#12348",
      customer: "Phạm Thị D",
      product: "Giường Ngủ",
      amount: "₫15,500,000",
      status: "Đã giao",
    },
  ];

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Đơn hàng gần đây
              </h2>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                Xem tất cả
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{order.id}</p>
                        <p className="text-sm text-slate-600">
                          {order.customer}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      {order.product}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {order.amount}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Đã giao"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Đang giao"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">
            Hiệu suất theo danh mục
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Sofa",
                revenue: "₫180M",
                percentage: 85,
                color: "bg-blue-500",
              },
              {
                name: "Bàn",
                revenue: "₫120M",
                percentage: 70,
                color: "bg-green-500",
              },
              {
                name: "Tủ",
                revenue: "₫95M",
                percentage: 60,
                color: "bg-purple-500",
              },
              {
                name: "Giường",
                revenue: "₫147M",
                percentage: 80,
                color: "bg-orange-500",
              },
            ].map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {category.name}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {category.revenue}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">
            Doanh thu theo thời gian
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
              <span className="text-sm text-slate-600">Doanh thu</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-slate-600">Lợi nhuận</span>
            </div>
          </div>
        </div>
        <div className="h-80 bg-slate-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">
              Biểu đồ doanh thu sẽ được hiển thị ở đây
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
