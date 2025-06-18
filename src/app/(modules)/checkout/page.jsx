"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const mockVoucher = [
  {
    code: "SALE10",
    discount: 10, // Giảm giá 10%
  },
  {
    code: "SALE20",
    discount: 20, // Giảm giá 20%
  },
];
export default function CheckoutPage() {
  const mockCartItems = useSelector((state) => state.checkout);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePlaceOrder = () => {
    console.log({ shippingInfo, paymentMethod, mockCartItems });
    alert("Đặt hàng thành công!");
  };
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApplyVoucher = () => {
    if (voucherCode === "SALE10") {
      setDiscount(0.1); // Giảm 10%
      toast.success("Áp dụng mã giảm giá thành công!");
    } else {
      setDiscount(0);
      toast.warning("Mã giảm giá không hợp lệ!");
    }
  };

  const totalBeforeDiscount = mockCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalK = totalBeforeDiscount - totalBeforeDiscount * discount;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 1/2: THÔNG TIN GIAO HÀNG */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Thông tin giao hàng</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={shippingInfo.name}
            onChange={handleInputChange}
            className="border rounded-md p-3 w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={shippingInfo.phone}
            onChange={handleInputChange}
            className="border rounded-md p-3 w-full "
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={shippingInfo.address}
            onChange={handleInputChange}
            className="border rounded-lg p-3 w-full md:col-span-2"
          />
          <input
            type="text"
            name="city"
            placeholder="Tỉnh/Thành phố"
            value={shippingInfo.city}
            onChange={handleInputChange}
            className="border rounded-lg p-3 w-full md:col-span-2"
          />
          <textarea
            name="note"
            placeholder="Ghi chú cho đơn hàng (tuỳ chọn)"
            value={shippingInfo.note}
            onChange={handleInputChange}
            className="border rounded-lg p-3 h-full  md:col-span-2 min-h-[120px]"
          ></textarea>
        </form>
      </div>

      {/* 1/2: ĐƠN HÀNG CỦA BẠN */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Đơn hàng của bạn</h2>

        {/* Danh sách sản phẩm */}
        <div className="space-y-4">
          {mockCartItems.map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <Image
                width={64}
                height={64}
                src={item.url}
                alt={item.name}
                className="w-16 h-16 rounded object-cover border"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.quantity} x {item.price.toLocaleString()}₫
                </p>
              </div>
              <div className="text-sm font-semibold">
                {(item.price * item.quantity).toLocaleString()}₫
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <label htmlFor="voucher" className="text-sm font-medium">
            Mã giảm giá
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="voucher"
              placeholder="Nhập mã giảm giá"
              className="border rounded-lg p-2 flex-1"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button
              onClick={handleApplyVoucher}
              className="bg-gray-800 text-white px-4 rounded hover:bg-black"
            >
              Áp dụng
            </button>
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Tạm tính:</span>
            <span>{totalBeforeDiscount.toLocaleString()}₫</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Giảm giá:</span>
              <span>
                - {(totalBeforeDiscount * discount).toLocaleString()}₫
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between text-lg font-semibold mt-2">
          <span>Tổng cộng:</span>
          <span>{totalK.toLocaleString()}₫</span>
        </div>

        {/* Phương thức thanh toán */}
        <div>
          <h3 className="text-sm font-medium mb-2">Phương thức thanh toán</h3>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span>Thanh toán khi nhận hàng (COD)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              <span>Thank toán VNPAY</span>
            </label>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 transition mt-4"
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
}
