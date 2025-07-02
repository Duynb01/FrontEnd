import Image from "next/image";
import React from "react";

export default function ProductBoxSearch({ product }) {
  return (
    <div className="w-full flex items-center gap-4 p-2 rounded-md shadow-[0_0_3px_rgb(0,0,0,0.1)] cursor-pointer hover:bg-gray-50 transition">
      <div className="flex-shrink-0">
        <Image
          width={64}
          height={64}
          alt={product.name}
          className="object-cover rounded-md"
          src={product.url}
        />
      </div>
      <div className="flex flex-col justify-between overflow-hidden w-full h-full">
        <p className="text-sm font-medium truncate text-right">
          {product.name}
        </p>
        <p className="text-sm text-gray-600 text-right">
          Số lượng: {product.stock}
        </p>
      </div>
    </div>
  );
}
