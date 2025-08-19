"use client";
import Image from "next/image";
import { formatExpiryDate } from "@/utils/formatData";
import { claimVoucher } from "@/lib/api/apiVoucher";
import { toast } from "react-toastify";
import { useState } from "react";
export default function VoucherCard({ voucher }) {
  const [isClaimed, setIsClaimed] = useState(false);

  const onClickSave = async (e) => {
    e.preventDefault();
    try {
      await claimVoucher(voucher.id);
      setIsClaimed(true);
    } catch (err) {
      toast.warning(err.message);
    }
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
            <h4 className="font-bold text-sm">{voucher.name}</h4>
          </div>
          <div className="text-[10px]">
            <p>
              Mã:{" "}
              <span className="font-bold text-[11px] uppercase">
                {voucher.code}
              </span>
            </p>
            <div className="flex items-center justify-between ">
              <span>HSD: {formatExpiryDate(voucher.expiryDate)}</span>
              <button
                onClick={onClickSave}
                className={` ${
                  isClaimed ? "bg-[#929191]" : "bg-main"
                } px-2 py-1 text-white uppercase rounded-full`}
              >
                {isClaimed ? "đã sao chép" : "sao chép mã"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
