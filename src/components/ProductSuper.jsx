"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
export default function ProductSuper() {
  return (
    <div className="group px-[7px] pb-[14px]">
      <div className="bg-white shadow-[0px_0px_3px_rgb(0,0,0,0.1)] hover:shadow-[0px_4px_6px_rgb(0,0,0,0.15)]  rounded-md overflow-hidden max-w-[257px] min-w-[257px] w-full">
        <div className="picture">
          <a href="">
            <Image
              src="/product/product_1.jpg"
              width={480}
              height={480}
              alt="hehe"
              className="w-full object-contain rounded-t-sm transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </a>
        </div>
        <div className="px-[14px] py-[10px] flex flex-col items-center justify-center">
          <span className="uppercase text-xs text-label">
            <a href="">anne</a>
          </span>
          <h3 className="text-sm  font-medium text-center">
            <a href=""> Bát ăn cơm gốm sứ ANNE màu ngẫu nhiên H5.7xD11.3</a>
          </h3>
          <div className="flex items-center justify-center gap-2 mb-[10px]">
            <span className="font-bold text-discount ">39,000₫</span>
            <span className="line-through text-old text-[13px]">249,000₫</span>
          </div>
          <button className="flex items-center justify-center text-[12px] font-bold rounded-full  border border-transparent cursor-pointer transition duration-300 ease-in-out hover:border-main">
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
