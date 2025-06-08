"use client";

import Image from "next/image";
import Link from "next/link";
import { useCaculatorPrice } from "@/hooks/useCaculatorPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({ product }) {
  const price = useCaculatorPrice(product);

  return (
    <div className="group w-full max-w-[14rem] shadow-[0_0_3px_rgb(0,0,0,0.1)] rounded-sm bg-white">
      {/* Hình ảnh */}
      <div className="p-[5px] relative">
        <Link href={`/products/${product.id}`} className="relative z-0">
          <Image
            src={product.src}
            alt=""
            width={480}
            height={480}
            className="w-full max-h-[180px] object-contain rounded-t-sm transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </Link>

        {product.discount > 0 && (
          <span className="absolute bg-main text-white px-[5px] py-[2px] text-[12px] font-bold top-2 left-2 rounded-[4px]">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Nội dung */}
      <div className="px-[14px] py-[10px] flex flex-col items-center text-center">
        <span className="uppercase text-xs text-label mb-1">
          <Link href="#">{product.supplier}</Link>
        </span>

        <h3 className="text-sm font-medium line-clamp-2">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center justify-center gap-2 my-2 text-sm">
          {product.discount ? (
            <>
              <span className="font-bold text-discount">{price.newPrice}</span>
              <span className="line-through text-old text-[13px]">
                {price.oldPrice}
              </span>
            </>
          ) : (
            <span className="font-bold text-price">{price.oriPrice}</span>
          )}
        </div>

        <button className="flex items-center justify-between text-[12px] font-bold rounded-full w-full border border-transparent cursor-pointer transition duration-300 ease-in-out group-hover:border-main">
          <span className="uppercase mx-4">Thêm vào giỏ</span>
          <span className="flex items-center justify-center w-8 h-8 bg-main rounded-full">
            <FontAwesomeIcon icon={faCartPlus} className="w-5 h-5 text-white" />
          </span>
        </button>
      </div>
    </div>
  );
}
