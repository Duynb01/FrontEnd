"use client";
import { CircleChevronRightIcon } from "lucide-react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import Image from "next/image";
import Link from "next/link";
export default function NewProduct() {
  const products = useSelector((state) => state.product);
  return (
    <div>
      <h2 className="text-main text-2xl font-bold mb-5">Sản phẩm mới</h2>
      <div className="grid grid-cols-2 mdc:grid-cols-6 gap-4 mb-4">
        <div className="hidden mdc:block mdc:col-span-1 bg-black">
          <Image
            src="https://theme.hstatic.net/200000796751/1001266995/14/home_coll_1_banner.jpg?v=91"
            width={1500}
            height={3764}
            alt="Sidebar banner"
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div className="product-content grid  grid-cols-2 smc:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 col-span-2 smc:col-span-3 md:col-span-5 gap-2">
          {products.slice(0, 10).map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.name}
              className="flex justify-center"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-[12.5rem] mx-auto group">
        <Link
          href={`/products`}
          className="w-full flex items-center justify-center px-6 py-2 gap-3 bg-white text-main rounded-md  sm:w-auto font-bold border border-main group-hover:bg-main group-hover:text-white transition-colors duration-500 ease-in-out"
        >
          <span className="font-bold">Xem tất cả</span>
          <CircleChevronRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
