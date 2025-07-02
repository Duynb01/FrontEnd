"use client";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { useEffect, useState } from "react";
import { getOneProduct } from "@/lib/api/apiProduct";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

export default function ProductDetailPage() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getOneProduct(id);
        setProduct(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin text-main" />
      </div>
    );
  }
  if (!product) {
    return <div className="p-6 text-red-500">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="p-6">
      <ProductDetail product={product} />
    </div>
  );
}
