"use client";
import { getOrderById } from "@/lib/api/apiOrder";
import { calculatePrice, validateVoucher } from "@/utils/discountVoucher";
import { formatPrice } from "@/utils/formatData";
import {
  CheckCircle,
  CircleCheckBig,
  Clock,
  Loader,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

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

  const [dataOrder, setDataOrder] = useState({});
  const [infoVoucher, setInfoVoucher] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setDataOrder(data);
        const voucher = await validateVoucher(data.voucherCode);
        setInfoVoucher(voucher);
      } catch (err) {
        toast.warning(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataOrder();
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader className="w-4 h-4 animate-spin text-main" />
      </div>
    );
  }

  return (
    <div className=" order-detail bg-white md:w-[80%] xl:w-[60%]  pb-4 pt-14 mx-auto ">
      {/* Header */}
      <div className="flex flex-col pb-10 items-center gap-2 font-semibold text-gray-900 ">
        <CircleCheckBig className="text-green-600 w-20 h-20" />
        <p className="font-bold text-2xl">Đặt hàng thành công!</p>
        <p className="font-medium text-sm">Mã đơn hàng: {dataOrder.code}</p>
        <p className="font-medium text-sm">
          Cảm ơn quý khách đã mua sắm từ cửa hàng của chúng tôi.
        </p>
      </div>
      {/* Order Info */}
      <div className=" my-4">
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
                <th className="border px-4 py-3 bg-gray-100 whitespace-nowrap">
                  Trạng thái đơn hàng
                </th>
                <td className="border px-4 py-3 ">
                  <div
                    className={`max-w-[50%] md:max-w-[45%] lg:max-w-[30%] flex items-center justify-center gap-2 px-5 py-1 rounded-sm text-md font-medium ${getStatusColor(
                      dataOrder.status
                    )}`}
                  >
                    {getStatusIcon(dataOrder.status)}
                    {getStatusText(dataOrder.status)}
                  </div>
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-3 bg-gray-100">
                  Phương thức thanh toán
                </th>
                <td className="border px-4 py-3 w-full">
                  {dataOrder?.Payment?.method === "cod"
                    ? "Thanh toán khi nhận hàng (COD)"
                    : "Thanh toán VNPay"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Order Item Info */}
      <div className="my-4">
        <div className="flex items-center justify-between px-5 py-2 font-medium text-[1.25rem] bg-blue-100 ">
          <p>Chi tiết sản phẩm</p>
          <p>{dataOrder.items?.length || 0} sản phẩm</p>
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
                    <td className="border border-gray-300 px-4 py-2 text-center flex items-center gap-1">
                      <Image
                        width={64}
                        height={64}
                        src={item.url}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <p>{item.name}</p>
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
      <div>
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
                  {dataOrder?.total?.toLocaleString()}₫
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Button Close */}
      <div className="text-center mt-4 group">
        <button
          className="px-6 py-2 bg-white text-main rounded-md  sm:w-auto font-bold border border-main group-hover:bg-main group-hover:text-white transition-colors duration-500 ease-in-out"
          onClick={handleBack}
        >
          Trở về trang chủ
        </button>
      </div>
    </div>
  );
}
