"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validVoucher } from "@/lib/api/apiVoucher";
import { createOrder } from "@/lib/api/apiOrder";
import { useRouter } from "next/navigation";
import { getProfileUser } from "@/lib/api/apiUser";
import { useSelector } from "react-redux";
import { createPayment, createVNPayPayment } from "@/lib/api/apiPayment";
import { validFormDataShipping } from "@/utils/isValidData";
export default function CheckoutPage() {
  const user = useSelector((state) => state.user.userInfo);
  const { id } = user;
  const router = useRouter();
  const [mockCartItems, setMockCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProfileUser(id);
      if (data) {
        setData(data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const { name, phone, address } = data;
    setShippingInfo((prev) => ({
      ...prev,
      name: name,
      phone: phone,
      address: address,
    }));
  }, [data]);

  // Xử lý Info
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const storedItems = localStorage.getItem("orderList");
    if (storedItems) {
      setMockCartItems(JSON.parse(storedItems));
    }
  }, []);

  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    const items = mockCartItems.map((item) => ({
      cartItemId: item.cartItemId,
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));
    const payload = {
      items,
      info: shippingInfo,
      method: paymentMethod,
      voucherCode: voucher.code || null,
      totalPrice: infoPrice.afterDiscount,
    };
    const errs = validFormDataShipping(payload.info);
    if (errs.length === 0) {
      try {
        const { orderId } = await createOrder(payload);
        if (payload.method === "vnpay") {
          const data = await createVNPayPayment(
            orderId,
            payload.method,
            payload.totalPrice
          );
          window.location.href = data.url;
          return;
        } else if (payload.method === "cod") {
          await createPayment(orderId, payload.method, payload.totalPrice);
        }
        console.log("orderId: ", orderId);

        router.push(`/order?orderId=${orderId}`);
        toast.success("Đặt hàng thành công!");
      } catch (err) {
        toast.warning(err.message);
      }
    } else {
      errs.forEach((err) => {
        toast.warning(err);
      });
    }
  };

  // Xử lý voucher
  const [voucherCode, setVoucherCode] = useState("");
  const [voucher, setVoucher] = useState({
    code: null,
    discount: 0,
    type: null,
  });
  const handleApplyVoucher = async () => {
    try {
      const dataVoucher = await validVoucher(voucherCode);
      setVoucher({
        code: dataVoucher.code,
        discount: dataVoucher.discount,
        type: dataVoucher.type,
      });
    } catch (err) {
      toast.warning(err.message);
    }
  };

  // Xử lý Tổng tiền
  const [infoPrice, setInfoPrice] = useState({
    beforeDiscount: null,
    discount: 0,
    afterDiscount: null,
  });

  useEffect(() => {
    if (voucher.code) {
      calculatePrice(voucher.type, voucher.discount);
    } else {
      calculatePrice("No Voucher");
    }
  }, [voucher, mockCartItems]);
  const calculatePrice = (type, discount = 0) => {
    const beforeDiscount = mockCartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const sales =
      type === "PERCENT" ? beforeDiscount * (discount / 100) : discount;
    const afterDiscount =
      beforeDiscount - sales > 0 ? beforeDiscount - sales : 1;

    setInfoPrice({
      beforeDiscount,
      discount: sales,
      afterDiscount,
    });
  };

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
            value={shippingInfo.name || ""}
            onChange={handleInputChange}
            className="border rounded-md p-3 w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={shippingInfo.phone || ""}
            onChange={handleInputChange}
            className="border rounded-md p-3 w-full "
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={shippingInfo.address || ""}
            onChange={handleInputChange}
            className="border rounded-lg p-3 w-full md:col-span-2"
          />
          <textarea
            name="note"
            placeholder="Ghi chú cho đơn hàng (tuỳ chọn)"
            value={shippingInfo.note || ""}
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
          {mockCartItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
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

        {/* Thông tin giảm giá */}
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
            <span>{infoPrice.beforeDiscount}₫</span>
          </div>
          {voucher.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Giảm giá:</span>
              <span>- {infoPrice.discount}₫</span>
            </div>
          )}
        </div>
        <div className="flex justify-between text-lg font-semibold mt-2">
          <span>Tổng cộng:</span>
          <span>{infoPrice.afterDiscount}₫</span>
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
                value="vnpay"
                checked={paymentMethod === "vnpay"}
                onChange={() => setPaymentMethod("vnpay")}
              />
              <span>Thanh toán VNPAY</span>
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
