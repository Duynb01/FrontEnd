"use client";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { useEffect, useState } from "react";
import { getOneProduct } from "@/lib/api/apiProduct";

export default function ProductDetailPage() {
  const [product, setProduct] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async (id) => {
      const data = await getOneProduct(id);
      setProduct(data);
    };
    fetchProduct(id);
  }, []);

  if (!product) {
    return <div className="p-6 text-red-500">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="p-6">
      <ProductDetail product={product} />
    </div>
  );
}
