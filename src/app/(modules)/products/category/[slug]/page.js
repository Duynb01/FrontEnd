import ProductWithCategoryPage from "@/components/page/ProductInCategoryPage";
import { getCategory, getCategoryById } from "@/lib/api/apiCategory";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryById(slug);
  return {
    title: category?.name || "Không tìm thấy sản phẩm",
    description: category?.description || "",
  };
}
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryById(slug);
  return <ProductWithCategoryPage category={category} />;
}
