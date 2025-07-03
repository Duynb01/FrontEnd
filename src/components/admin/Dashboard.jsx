import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  Eye,
  Package,
  Plus,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import React from "react";

export default function DashboardTab() {
  const stats = [
    {
      title: "Tổng doanh thu",
      value: "₫542,000,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      title: "Đơn hàng",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Sản phẩm",
      value: "856",
      change: "+2.1%",
      trend: "up",
      icon: Package,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      title: "Khách hàng",
      value: "2,847",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
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

  const topProducts = [
    { name: "Sofa Da Thật Premium", sold: 45, revenue: "₫112,500,000" },
    { name: "Bàn Ăn Gỗ Sồi 6 Chỗ", sold: 32, revenue: "₫96,000,000" },
    { name: "Tủ Quần Áo 3 Cánh", sold: 28, revenue: "₫84,000,000" },
    { name: "Giường Ngủ Cao Cấp", sold: 21, revenue: "₫63,000,000" },
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
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
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
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Sản phẩm bán chạy
              </h2>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                Xem tất cả
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {product.sold} đã bán
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {product.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            Thao tác nhanh
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <Plus className="w-5 h-5 mr-2" />
              Thêm sản phẩm
            </button>
            <button className="flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <Eye className="w-5 h-5 mr-2" />
              Xem đơn hàng
            </button>
            <button className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <BarChart3 className="w-5 h-5 mr-2" />
              Báo cáo
            </button>
            <button className="flex items-center justify-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <Settings className="w-5 h-5 mr-2" />
              Cài đặt
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
