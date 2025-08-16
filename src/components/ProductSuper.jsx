"use client";

import { useCaculatorPrice } from "@/hooks/useCaculatorPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { addCart } from "@/lib/api/apiCart";
import { toast } from "react-toastify";
export default function ProductSuper({ product }) {
  const price = useCaculatorPrice(product);
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addCart(product);
      toast.success("Thêm vào giỏ hàng thành công!");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="group px-[7px] pb-[14px]">
      <div className="bg-white shadow-[0px_0px_3px_rgb(0,0,0,0.1)] hover:shadow-[0px_4px_6px_rgb(0,0,0,0.15)]  rounded-md overflow-hidden max-w-[257px] min-w-[257px] w-full">
        <div className="picture p-[5px] relative">
          <div className="relative z-0">
            <Image
              src={product.url}
              width={480}
              height={480}
              alt={product.name}
              className="w-full max-h-[247px]  object-contain rounded-t-sm transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          {product.discount && (
            <span className="absolute bg-main text-white px-[5px] py-[2px] text-[12px] font-bold top-2 left-2 rounded-[4px]">
              -{product.discount}%
            </span>
          )}
        </div>
        <div className="px-[14px] py-[10px] flex flex-col items-center justify-center">
          <span className="uppercase text-xs text-label mb-1">
            <p>{product.supplier}</p>
          </span>

          <h3 className="text-sm font-medium line-clamp-2 h-[40px]">
            <p>{product.name}</p>
          </h3>

          <div className="flex items-center justify-center gap-2 my-2 text-sm">
            {product.discount ? (
              <>
                <span className="font-bold text-discount">
                  {price.newPrice}
                </span>
                <span className="line-through text-old text-[13px]">
                  {price.oldPrice}
                </span>
              </>
            ) : (
              <span className="font-bold text-price">{price.oriPrice}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center text-[12px] font-bold rounded-full  border border-transparent cursor-pointer transition duration-300 ease-in-out hover:border-main"
          >
            <span className="uppercase mx-4">Thêm vào giỏ</span>
            <span className="flex items-center justify-center w-8 h-8 bg-main rounded-full">
              <FontAwesomeIcon
                icon={faCartPlus}
                className="w-5 h-5 text-white"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
