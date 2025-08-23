"use client";
import { getOrder, updateOrderStatus } from "@/lib/api/apiOrder";
import { formatExpiryDate, formatPrice } from "@/utils/formatData";
import {
  CheckCircle,
  Clock,
  Eye,
  Filter,
  ShoppingCart,
  Truck,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import OrderDetail from "../OrderDetail";

export default function OrderTab() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getOrder();
        setOrders(orders);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Đã giao":
        return <CheckCircle className="w-4 h-4" />;
      case "Đang giao":
        return <Truck className="w-4 h-4" />;
      case "Đang xử lý":
        return <Clock className="w-4 h-4" />;
      case "Đã hủy":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };
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
  const quantityDelivered = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;
  const quantityProcessing = orders.filter(
    (order) => order.status === "PROCESSING"
  ).length;
  const quantityShipped = orders.filter(
    (order) => order.status === "SHIPPING"
  ).length;

  const [isShowDetail, setIsShowDetail] = useState(false);

  const [orderIdDetail, setOrderIdDetail] = useState(null);
  const handleShowDetail = async (orderId) => {
    try {
      // const data = await getOrderById(orderId);
      setOrderIdDetail(orderId);
    } catch (err) {
      console.error("Error fetching order details:", err);
      toast.error("Không thể lấy thông tin đơn hàng");
    }

    setIsShowDetail(!isShowDetail);
  };
  const handleUpdateStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: status } : order
        )
      );
    } catch (err) {
      console.error("Update status failed:", err.message);
      toast.error("Không thể cập nhật trạng thái đơn hàng");
    }
  };
  const handleCloseOrderDetail = () => {
    setIsShowDetail(false);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Orders Header */}
        <h2 className="text-2xl font-bold text-slate-800">Quản lý đơn hàng</h2>

        {/* Orders Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-slate-900">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Đang xử lý</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {quantityProcessing}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Đang giao</p>
                <p className="text-2xl font-bold text-blue-600">
                  {quantityShipped}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">
                  {quantityDelivered}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Filter */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Tất cả trạng thái</option>
                <option>Đang xử lý</option>
                <option>Đang giao</option>
                <option>Đã giao</option>
                <option>Đã hủy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Mã Đơn hàng
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Phương thức
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {order.code}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900 text-center">
                        {order.user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <div className="text-center">
                        {formatExpiryDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      <div className="text-center">
                        {formatPrice(order.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-center">
                        {order.Payment?.method.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`flex items-center justify-center gap-2 px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(
                          getNameStatus(order.status)
                        )}`}
                      >
                        {getStatusIcon(getNameStatus(order.status))}
                        {order.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleShowDetail(order.id)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded-lg hover:bg-indigo-50 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <div className="">
                          <select
                            className="border border-slate-300 rounded-lg px-3 py-2"
                            value={order.status}
                            onChange={(e) => {
                              handleUpdateStatus(order.id, e.target.value);
                            }}
                          >
                            <option value={"PROCESSING"}>Đang xử lý</option>
                            <option value={"SHIPPING"}>Đang giao</option>
                            <option value={"DELIVERED"}>Đã giao</option>
                            <option value={"CANCELLED"}>Đã hủy</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isShowDetail && (
        <div className=" w-full h-full">
          <div className="overlay2" onClick={handleCloseOrderDetail}></div>
          {/* OrderDeteil */}
          <div className="overlay-content w-full  md:w-[90%] mdc:w-[80%] xl:w-[60%]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Chi tiết đơn hàng</h3>
              <button
                onClick={handleCloseOrderDetail}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            {/* Sửa tại đây */}
            <div className="">{<OrderDetail orderId={orderIdDetail} />}</div>
          </div>
        </div>
      )}
    </>
  );
}
