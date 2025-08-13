"use client";
import { getOrderById } from "@/lib/api/apiOrder";
import { calculatePrice, validateVoucher } from "@/utils/discountVoucher";
import { formatExpiryDate, formatPrice } from "@/utils/formatData";
import {
  CheckCircle,
  CircleChevronRightIcon,
  Clock,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OrderTab({ orders }) {
  const [selectStatus, setSelectStatus] = useState("ALL");
  const status = ["DELIVERED", "SHIPPING", "PROCESSING", "CANCELLED"];

  const filteredStatus = orders.filter((order) =>
    selectStatus === "ALL" ? true : order.status === selectStatus
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "SHIPPING":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "PROCESSING":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "CANCELLED":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "ALL":
        return "Tất cả trạng thái";
      case "DELIVERED":
        return "Đã giao hàng";
      case "SHIPPING":
        return "Đang giao hàng";
      case "PROCESSING":
        return "Đang xử lý";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return "Chưa xác định";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-600 bg-green-50";
      case "SHIPPING":
        return "text-blue-600 bg-blue-50";
      case "PROCESSING":
        return "text-yellow-600 bg-yellow-50";
      case "CANCELLED":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit"));
  const [quantity, setQuantity] = useState(limit);
  useEffect(() => {
    setQuantity(limit);
  }, [limit]);
  const router = useRouter();
  const handleShowMore = () => {
    const newLimit =
      quantity + 5 > filteredStatus.length
        ? filteredStatus.length
        : quantity + 5;

    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());

    router.push(`/account?${params.toString()}`, {
      scroll: false,
      shallow: true,
    });
    setQuantity(newLimit);
  };
  const handleHidden = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", 3);
    router.push(`/account?${params.toString()}`, {
      scroll: false,
      shallow: true,
    });
    setQuantity(3);
  };
  const [dataOrder, setDataOrder] = useState({});
  const [infoVoucher, setInfoVoucher] = useState("");
  const [isShowDetail, setIsShowDetail] = useState(false);
  const handleShowDetail = async (id) => {
    try {
      const data = await getOrderById(id);
      setIsShowDetail(true);
      setDataOrder(data);
      const voucher = await validateVoucher(data.voucherCode);
      setInfoVoucher(voucher);
    } catch (err) {
      toast.warning(err.message);
    }
  };
  const handleCloseDetail = () => {
    setIsShowDetail(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Đơn hàng của tôi
        </h2>
        <select
          className="border px-3 py-2 rounded-sm"
          value={selectStatus}
          onChange={(e) => setSelectStatus(e.target.value)}
        >
          <option value="ALL">Tất cả trạng thái</option>
          {status.map((value) => (
            <option key={value} value={value}>
              {getStatusText(value)}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {filteredStatus.map((order, i) => {
          if (i < quantity) {
            return (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">
                      {order.code}
                    </h3>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {order.total.toLocaleString()}₫
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatExpiryDate(order.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-md text-gray-600 mb-1">
                        {order.items.length} sản phẩm
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleShowDetail(order.id);
                      }}
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      {isShowDetail && (
        <div className=" order-detail bg-white w-full inset-0 py-4 min-h-max">
          {/* Header */}
          <div className="flex flex-col pb-4 items-center gap-3 font-semibold text-gray-900 ">
            <p>{dataOrder.code}</p>
            <div
              className={`flex items-center justify-center gap-2 px-5 py-1 rounded-full text-md font-medium ${getStatusColor(
                dataOrder.status
              )}`}
            >
              {getStatusIcon(dataOrder.status)}
              {getStatusText(dataOrder.status)}
            </div>
          </div>
          {/* Order Info */}
          <div className=" mb-4">
            <p className="px-5 py-2 font-medium text-[1.25rem] bg-blue-100 ">
              Thông tin đơn hàng
            </p>
            <div className="px-5 py-4">
              <table className="border-collapse border border-gray-300 text-left">
                <tbody>
                  <tr>
                    <th className="border px-4 py-3 bg-gray-100 whitespace-nowrap">
                      Người nhận
                    </th>
                    <td className="border px-4 py-3 w-full">
                      {dataOrder.shippingInfo?.name || "Chưa cập nhật"}
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-3 bg-gray-100 whitespace-nowrap">
                      Số điện thoại
                    </th>
                    <td className="border px-4 py-3 w-full">
                      {dataOrder.shippingInfo?.phone || "Chưa cập nhật"}
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-3 bg-gray-100 whitespace-nowrap">
                      Địa chỉ
                    </th>
                    <td className="border px-4 py-3 w-full">
                      {dataOrder.shippingInfo?.address || "Chưa cập nhật"}
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-3 bg-gray-100 whitespace-nowrap">
                      Ghi chú
                    </th>
                    <td className="border px-4 py-3 w-full">
                      {dataOrder.shippingInfo?.note || "Chưa cập nhật"}
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-3 bg-gray-100">
                      Phương thức thanh toán
                    </th>
                    <td className="border px-4 py-3 w-full">
                      {dataOrder.Payment.method === "cod"
                        ? "Thanh toán khi nhận hàng (COD)"
                        : "Thanh toán VNPay"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Order Item Info */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-5 py-2 font-medium text-[1.25rem] bg-blue-100 ">
              <p>Chi tiết sản phẩm</p>
              <p>{dataOrder.items.length} sản phẩm</p>
            </div>
            <div className="px-5 py-4">
              <table className="min-w-full border border-gray-300 bg-white table-auto">
                <thead className="bg-slate-100 text-black">
                  <tr>
                    <th className="px-4 py-2 ">Sản phẩm</th>
                    <th className="px-4 py-2">Giá</th>
                    <th className="px-4 py-2 whitespace-nowrap">Số lượng</th>
                    <th className="px-4 py-2 whitespace-nowrap">Thành tiền</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(dataOrder.items) &&
                    dataOrder.items.map((item, i) => (
                      <tr key={i}>
                        <td className="border border-gray-300 px-4 py-2 text-center flex items-center ">
                          <Image
                            width={64}
                            height={64}
                            src={item.url}
                            alt={item.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                          {item.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {formatPrice(item.price)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {item.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {formatPrice(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot className="bg-gray-200 font-bold">
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      Tổng tiền
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {formatPrice(calculatePrice(dataOrder.items))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* Order Sumary */}
          <div className=" mb-4">
            <p className="px-5 py-2 font-medium text-[1.25rem] bg-blue-100 ">
              Tổng quan đơn hàng
            </p>
            <div className="px-5 py-4">
              <table className="border-collapse border border-gray-300 text-left">
                <tbody>
                  <tr>
                    <th className="border px-4 py-3 bg-gray-100 whitespace-nowrap">
                      Tổng tiền sản phẩm
                    </th>
                    <td className="border px-4 py-3 w-full">
                      {formatPrice(calculatePrice(dataOrder.items))}
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-3 bg-gray-100 whitespace-nowrap">
                      Voucher
                    </th>
                    <td className="border px-4 py-3 w-full">-{infoVoucher}</td>
                  </tr>

                  <tr>
                    <th className="border px-4 py-3 bg-gray-100">
                      Tổng tiền thanh toán
                    </th>
                    <td className="border px-4 py-3 w-full">
                      {dataOrder.total.toLocaleString()}₫
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Button Close */}
          <div className="flex justify-center gap-4">
            {dataOrder.status === "PROCESSING" && (
              <button
                className=" capitalize border px-2 py-1 rounded-sm text-sm text-red-600 hover:text-red-800"
                onClick={() => {
                  // Handle cancel order logic here
                  toast.warning("Chức năng hủy đơn hàng chưa được triển khai.");
                }}
              >
                Hủy đơn
              </button>
            )}
            <button
              className=" capitalize border px-2 py-1 rounded-sm text-sm"
              onClick={handleCloseDetail}
            >
              đóng
            </button>
          </div>
        </div>
      )}
      {filteredStatus.length > 3 && (
        <div className="text-center pt-4">
          {quantity === filteredStatus.length ? (
            <>
              <button
                onClick={handleHidden}
                className="w-full text-center gap-3 font-medium bg-white rounded-md  sm:w-auto  hover:text-main hover:font-bold"
              >
                Ẩn bớt
              </button>
            </>
          ) : (
            <button
              onClick={handleShowMore}
              className="w-full text-center gap-3 font-medium bg-white rounded-md  sm:w-auto  hover:text-main hover:font-bold"
            >
              Xem thêm
            </button>
          )}
        </div>
      )}
    </div>
  );
}
