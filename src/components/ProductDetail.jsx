"use client";

import { useState } from "react";
import Image from "next/image";
import { useCaculatorPrice } from "@/hooks/useCaculatorPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Review from "./Review";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCart } from "@/lib/api/apiCart";
import { Undo2 } from "lucide-react";

export default function ProductDetail({ product }) {
  const router = useRouter();
  const isCheckLogin = useSelector((state) => state.auth.isCheckLogin);
  const listProduct = useSelector((state) => state.product);
  const price = useCaculatorPrice(product);
  const [quantity, setQuantity] = useState(1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!isCheckLogin) {
      toast.error("Vui lòng đăng nhập!");
    } else {
      const data = await addCart({ id: product.id, quantity });
      if (data) {
        toast.success("Thêm vào giỏ hàng thành công!");
      }
    }
  };

  const handleBuyNow = () => {
    if (!isCheckLogin) {
      toast.error("Vui lòng đăng nhập!");
      return;
    }
    const payload = {
      ...product,
      quantity: quantity,
    };

    if (JSON.parse(localStorage.getItem("orderList"))) {
      localStorage.removeItem("orderList");
    }
    localStorage.setItem("orderList", JSON.stringify([payload]));
    router.push("/checkout");
  };

  const relatedProducts = listProduct.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const handleBack = () => {
    router.back();
  };

  if (!product) return <p>Không tìm thấy sản phẩm</p>;
  return (
    <div className=" container flex flex-col gap-4 p-4">
      <div>
        <button
          onClick={handleBack}
          className="flex  items-center gap-1 border rounded-full px-3 py-2 hover:bg-gray-100"
        >
          <Undo2 className="text-main" />
          Quay lại
        </button>
      </div>

      {/* Phần chi tiết sản phẩm */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-sm p-4 rounded-sm">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image
            src={product.url}
            alt={product.name}
            width={500}
            height={500}
            priority
            className="w-full max-w-sm max-h-[24rem] object-contain rounded-sm"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-sm">Số lượng: {product.stock}</p>

          <div className="flex items-center gap-3 text-lg">
            Giá:
            {!product.discount ? (
              <span className="font-bold text-price">{price.oriPrice}</span>
            ) : (
              <>
                <span className="font-bold text-discount">
                  {price.newPrice}
                </span>
                <span className="line-through text-old text-sm">
                  {price.oldPrice}
                </span>
                <span className="bg-white text-discount px-[6px] py-[4px] text-sm font-bold rounded-[4px] border border-discount">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span>Số lượng:</span>
            <button
              onClick={handleDecrease}
              className="w-8 h-8 border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100"
            >
              -
            </button>
            <span className="w-8 text-center">
              {quantity <= product.stock ? quantity : product.stock}
            </span>
            <button
              onClick={handleIncrease}
              className="w-8 h-8 border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-white text-main px-6 py-2 rounded-md hover:bg-gray-200 w-full sm:w-auto font-bold border border-main"
            >
              <FontAwesomeIcon icon={faCartPlus} />
              Thêm vào giỏ hàng
            </button>
            <button
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 bg-main text-white px-6 py-2 rounded-md hover:bg-[#960e30] w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faCreditCard} />
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Mô tả chi tiết */}
      <div className="bg-white p-4 rounded-sm shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
        {product.description ? (
          <div
            className="text-gray-700 text-sm leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed">
            Chưa có mô tả chi tiết cho sản phẩm này. Đây là dòng sản phẩm chất
            lượng cao, được chế tác tỉ mỉ từ nguyên vật liệu bền đẹp và thiết kế
            hiện đại, phù hợp cho mọi không gian nội thất.
          </p>
        )}
      </div>

      {/* Đánh giá */}
      <div className="bg-white p-4 rounded-sm shadow-sm">
        <Review productId={product.id} />
      </div>

      {/* Sản phẩm liên quan */}
      {relatedProducts.length > 0 && (
        <div className="bg-white p-4 rounded-sm shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedProducts.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="flex justify-center"
              >
                <ProductCard product={item} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
