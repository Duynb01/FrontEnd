"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, updateCart, removeItemCart } from "@/lib/api/apiCart";
import { toast } from "react-toastify";
import CartItem from "@/components/CartItem";
import { Loader } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [cartItem, setCartItems] = useState([]);
  const [listCart, setListCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setListCart(data);
    } catch (err) {
      toast.warning(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Chọn Sản phẩm
  const handleSelectItem = (id) => {
    setCartItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Chọn tất cả
  const handleSelectAll = () => {
    if (cartItem.length === listCart.length) {
      setCartItems([]);
    } else {
      setCartItems(listCart.map((item) => item.cartItemId));
    }
  };

  const selectedTotal = listCart
    .filter((item) => cartItem.includes(item.cartItemId))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Đặt hàng
  const handlePlaceOrder = () => {
    const selectedOrderItems = listCart.filter((item) =>
      cartItem.includes(item.cartItemId)
    );
    if (JSON.parse(localStorage.getItem("orderList"))) {
      localStorage.removeItem("orderList");
    }
    localStorage.setItem("orderList", JSON.stringify(selectedOrderItems));
    router.push("/checkout");
  };

  // Xóa sản phẩm khỏi Cart
  const handleDeleteItem = async (id) => {
    const data = await removeItemCart(id);
    if (data) {
      toast.success("Xóa thành công!");
      fetchCart();
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      await updateCart({ cartItemId, newQuantity });
      toast.success("Cập nhật thành công!");
      fetchCart();
    } catch (err) {
      toast.warning(err.message);
    }
  };
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white">
        <div className="flex items-center">
          <Loader className="w-5 h-5 animate-spin text-main" />
          <span className="ml-2">Đang tải giỏ hàng...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>
      <div className="flex items-center justify-between px-4 py-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={listCart.length > 0 && cartItem.length === listCart.length}
            onChange={handleSelectAll}
          />
          <span>Chọn tất cả</span>
        </label>
      </div>
      {listCart.length === 0 ? (
        <p className="text-gray-600">Không có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Danh sách sản phẩm */}
          <div className="md:col-span-2 space-y-4 ">
            {listCart.map((item) => (
              <CartItem
                key={item.cartItemId}
                item={item}
                isSelected={cartItem.includes(item.cartItemId)}
                onSelect={() => handleSelectItem(item.cartItemId)}
                onDelete={handleDeleteItem}
                onUpdate={handleUpdateQuantity}
              />
            ))}
          </div>

          {/* Tổng cộng */}
          <div className="p-6 bg-gray-50 rounded-lg shadow space-y-4 h-fit">
            <h2 className="text-xl font-semibold">Tóm tắt đơn hàng</h2>
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{selectedTotal.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng:</span>
              <span>{selectedTotal.toLocaleString()}₫</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={cartItem.length === 0}
              className={`w-full mt-4 py-3 rounded-lg text-white ${
                cartItem.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
