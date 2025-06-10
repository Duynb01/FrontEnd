"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products as allProducts, categories } from "@/data/products";
import Link from "next/link";

export default function ProductListPage() {
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả sản phẩm");

  // lọc danh mục
  const filteredProducts = allProducts.filter((p) =>
    selectedCategory === "Tất cả sản phẩm"
      ? true
      : p.category === selectedCategory
  );

  // sắp xếp theo giá
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>

      {/* Bộ lọc */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Lọc theo danh mục */}
        <select
          className="border px-3 py-2 rounded-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-4">
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
