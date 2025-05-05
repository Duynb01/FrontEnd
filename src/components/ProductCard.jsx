"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard() {
  return (
    <div className="group m-[20px] max-w-[12rem] shadow-[0px_0px_3px_rgb(0,0,0,0.1)] rounded-sm">
      <div className="p-[5px]">
        <a href="">
          <img
            src="https://khothietke.net/wp-content/uploads/2021/05/PNGKhothietke.net-03065.png"
            alt=""
            className="w-full max-h-[180px] object-contain rounded-t-sm transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </a>
      </div>
      <div className="px-[14px] py-[10px] flex flex-col items-center justify-center">
        <span className="uppercase text-xs text-label">
          <a href="">nelly</a>
        </span>
        <h3 className="text-sm  font-medium text-center">
          <a href=""> Đệm Ngồi Ghế Thư Giãn 100% Cotton NELLY</a>
        </h3>
        <div className="flex items-center justify-center gap-2 mb-[10px]">
          <span className="font-bold text-discount ">99,600₫</span>
          <span className="line-through text-old text-[13px]">249,000₫</span>
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
