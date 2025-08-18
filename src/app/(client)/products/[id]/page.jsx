import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/lib/api/apiProduct";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const product = await getProductById(id);
  return {
    title: product?.name || "Không tìm thấy sản phẩm",
    description: product?.description || "",
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  return (
    <div className="p-6">
      <ProductDetail product={product} />
    </div>
  );
}
