"use client";
import { getMyVoucher } from "@/lib/api/apiVoucher";
import { formatExpiryDate, formatPrice } from "@/utils/formatData";
import { Calendar, Gift, Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function VoucherTab() {
  const [vouchers, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const response = await getMyVoucher();
        setOrders(response);
      } catch (error) {
        console.error("Failed to fetch vouchers:", error);
      } finally {
        const timeOut = setTimeout(() => {
          setLoading(false);
        }, 200);
        return () => clearTimeout(timeOut);
      }
    };
    fetchVouchers();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader className="w-4 h-4 animate-spin text-main" />
      </div>
    );
  }

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
              !voucher.active ? "opacity-50 bg-gray-50" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {voucher.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Mã:{" "}
                    <span className="font-mono font-medium">
                      {voucher.code}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      HSD: {formatExpiryDate(voucher.expiryDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {voucher.type === "PERCENT"
                    ? `${voucher.discount}%`
                    : `${formatPrice(voucher.discount)}`}
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    voucher.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {voucher.active ? "Có thể sử dụng" : "Đã hết hạn"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
