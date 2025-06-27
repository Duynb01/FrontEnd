"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

export default function ProductWithCategoryPage() {
  const pathName = useParams();
  const listProduct = useSelector((state) => state.product);
  const listCategory = useSelector((state) => state.category);
  const nameCategory = listCategory.find(
    (category) => category.slug === pathName.categoryId
  )?.name;

  const productWithCategory = listProduct.filter((product) => {
    return product.category === nameCategory;
  });

  const [sortOrder, setSortOrder] = useState("default");
  const sortedProducts = [...productWithCategory].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="wrapper-product container">
      <h2 className="text-xl font-bold mb-4 mt-8">
        Danh sách sản phẩm:
        <span className="ml-2 text-main">{nameCategory}</span>
      </h2>

      {/* Bộ lọc */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Lọc theo giá */}
        <select
          className="border px-3 py-2 rounded-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Mặc định</option>
          <option value="low-to-high">Giá: Thấp đến Cao</option>
          <option value="high-to-low">Giá: Cao đến Thấp</option>
        </select>
      </div>
      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedProducts.length === 0 ? (
          <p className="col-span-full text-gray-500">Không có sản phẩm nào.</p>
        ) : (
          sortedProducts.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="flex justify-center"
            >
              <ProductCard product={product} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
