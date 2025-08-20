"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useSelector } from "react-redux";
import NavButton from "@/components/NavButton";

export default function ProductListPage() {
  const listProduct = useSelector((state) => state.product);
  const listCategory = useSelector((state) => state.category);
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả sản phẩm");

  const filteredProducts = listProduct.filter((product) =>
    selectedCategory === "Tất cả sản phẩm"
      ? true
      : product.category === selectedCategory
  );

  // sắp xếp theo giá
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="wrapper-product container">
      <div className="my-4 flex items-center gap-4">
        <NavButton />
        <h2 className="text-xl font-bold ">Danh sách sản phẩm</h2>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Lọc theo danh mục */}
        <select
          className="border px-3 py-2 rounded-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Tất cả sản phẩm">Tất cả sản phẩm</option>
          {listCategory.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mdc:grid-cols-5 xl:grid-cols-6 gap-4  pb-4">
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
