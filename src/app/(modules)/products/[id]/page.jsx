"use client";

import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { products } from "@/data/products";

export default function ProductDetailPage() {
  const { id } = useParams();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <div className="p-6 text-red-500">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="p-6">
      <ProductDetail product={product} />
    </div>
  );
}
