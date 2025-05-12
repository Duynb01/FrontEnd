"use client";
import Link from "next/link";
import Image from "next/image";
export default function Voucher() {
  const onClickSave = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.innerText = "đã sao chép";
    target.classList.add("bg-[#929191]", "disabled");
    target.classList.remove("bg-main");
  };
  return (
    <div className="min-w-[50%] px-[7px] xl:min-w-[25%] ">
      <div className="voucher-content flex bg-[#fdf0d1] rounded-xl">
        <div className="p-[10px]">
          <Image
            src="/voucher/voucher_1_img.svg"
            width={117}
            height={106}
            className="rounded-lg bg-[#121211] p-[10px]"
            alt="Voucher 1"
          />
        </div>
        <div className="w-full p-[10px]">
          <div className="pb-3">
            <h4 className="font-bold text-sm">Giảm 200.000đ</h4>
            <p className="text-[12px]">Đơn hàng từ 3 triệu</p>
          </div>
          <div className="text-[10px]">
            <p>
              Mã:{" "}
              <span className="font-bold text-[11px] uppercase">
                vouchert3-200k
              </span>
            </p>
            <div className="flex items-center justify-between ">
              <span>HSD: 31/03/2025</span>
              <button
                onClick={onClickSave}
                className="bg-main px-2 py-1 text-white uppercase rounded-full"
              >
                sao chép mã
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
