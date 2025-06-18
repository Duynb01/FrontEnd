import { Calendar, Gift } from "lucide-react";
import React from "react";

export default function VouchersTab() {
  const vouchers = [
    {
      id: 1,
      code: "SAVE20",
      title: "Giảm 20% đơn hàng",
      discount: "20%",
      minOrder: "500.000đ",
      expiry: "2025-07-30",
      status: "active",
    },
    {
      id: 2,
      code: "FREESHIP",
      title: "Miễn phí vận chuyển",
      discount: "Free Ship",
      minOrder: "200.000đ",
      expiry: "2025-06-25",
      status: "active",
    },
    {
      id: 3,
      code: "WELCOME10",
      title: "Giảm 10% cho khách hàng mới",
      discount: "10%",
      minOrder: "100.000đ",
      expiry: "2025-06-20",
      status: "expired",
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Voucher của tôi
      </h2>

      <div className="space-y-4">
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            className={`border rounded-lg p-4 ${
              voucher.status === "expired"
                ? "opacity-50 bg-gray-50"
                : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {voucher.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Mã:{" "}
                    <span className="font-mono font-medium">
                      {voucher.code}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Đơn tối thiểu: {voucher.minOrder}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      HSD: {voucher.expiry}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {voucher.discount}
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    voucher.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {voucher.status === "active"
                    ? "Có thể sử dụng"
                    : "Đã hết hạn"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
