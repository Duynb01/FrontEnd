import { getOrder } from "@/lib/api/apiOrder";
import { getProduct } from "@/lib/api/apiProduct";
import { getUser } from "@/lib/api/apiUser";
import { formatPrice } from "@/utils/formatData";
import { getMonthRevenue, getPerformance } from "@/lib/api/apiAnalytic";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import RevenueChart from "../RevenueChart";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DashboardTab() {
  const router = useRouter();
  const [data, setData] = useState({
    users: [],
    orders: [],
    products: [],
    performances: [],
    revenues: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUser();
        const orders = await getOrder();
        const products = await getProduct();
        const performances = await getPerformance();
        const revenues = await getMonthRevenue();
        if (users) setData((prev) => ({ ...prev, users: users }));
        if (orders) setData((prev) => ({ ...prev, orders: orders }));
        if (products) setData((prev) => ({ ...prev, products: products }));
        if (performances)
          setData((prev) => ({ ...prev, performances: performances }));
        if (revenues) setData((prev) => ({ ...prev, revenues: revenues }));
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã giao":
        return "bg-green-100 text-green-700";
      case "Đang giao":
        return "bg-blue-100 text-blue-700";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-700";
      case "Đã hủy":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };
  const getNameStatus = (status) => {
    switch (status) {
      case "DELIVERED":
        return "Đã giao";
      case "SHIPPING":
        return "Đang giao";
      case "PROCESSING":
        return "Đang xử lý";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return "Đang xử lý";
    }
  };
  const getColor = (categoryId) => {
    switch (categoryId) {
      case 1:
        return "bg-pink-500";
      case 2:
        return "bg-blue-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-teal-500";
      case 5:
        return "bg-purple-500";
      case 6:
        return "bg-orange-500";
      case 7:
        return "bg-red-500";
      case 8:
        return "bg-gray-500";
      default:
        return "bg-gray-200";
    }
  };

  const { users, orders, products } = data;
  const totalRevenue = orders.reduce((total, item) => {
    if (item.status === "DELIVERED" || item.Payment.method === "vnpay") {
      return total + item.total;
    }
    return total;
  }, 0);
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
  const recentOrders = orders.slice(0, 4);
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
              <a
                href="/dashboard?tab=orders"
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                Xem tất cả
              </a>
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
                        <p className="font-medium text-slate-900">
                          {order.code}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order?.user?.name}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      {order?.items.length} sản phẩm
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {formatPrice(order.total)}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        getNameStatus(order.status)
                      )}`}
                    >
                      {getNameStatus(order.status)}
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
            {data.performances.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {category.categoryName}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {formatPrice(category.totalRevenue)}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getColor(
                      category.categoryId
                    )}`}
                    style={{ width: `${category.revenuePercent}%` }}
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
              <div className="w-3 h-3 bg-indigo-500  mr-2"></div>
              <span className="text-sm text-slate-600">Doanh thu</span>
            </div>
          </div>
        </div>
        <div className="h-80 bg-slate-50 rounded-xl flex items-center justify-center">
          <RevenueChart data={data.revenues} />
        </div>
      </div>
    </>
  );
}
