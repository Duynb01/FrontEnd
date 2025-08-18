"use client";

import { verifyPayment } from "@/lib/api/apiPayment";
import { CircleCheckBig, CircleX, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VNPayReturnPage() {
  const router = useRouter();
  const [dataPayment, setDataPayment] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const queryString = url.searchParams.toString();

    const fetchVerify = async () => {
      try {
        setLoading(true);
        const data = await verifyPayment(queryString);
        setDataPayment(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVerify();
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-4 py-10">
        <Loader className="w-4 h-4 animate-spin text-main" />
        Đang xác minh thanh toán...
      </div>
    );
  }

  return (
    <div className=" order-detail bg-white w-[60%]  pb-4 pt-14 mx-auto mt-14 ">
      {/* Header */}
      <div className="flex flex-col pb-10 items-center gap-2 font-semibold text-gray-900 ">
        {dataPayment.message === "Thanh toán thành công" ? (
          <>
            <CircleCheckBig className="text-green-600 w-20 h-20" />
            <p className="font-bold text-2xl">{dataPayment.message}</p>
            <p className="font-medium text-sm">
              Mã thanh toán: {dataPayment.payment?.code}
            </p>
            <p className="font-medium text-sm">
              Cảm ơn quý khách đã mua sắm từ cửa hàng của chúng tôi.
            </p>
          </>
        ) : (
          <>
            <CircleX className="text-red-600 w-20 h-20" />
            <p className="font-bold text-2xl">{dataPayment.message}</p>
            <p className="font-medium text-sm">
              Vui lòng kiểm tra lại thông tin thanh toán!
            </p>
          </>
        )}
      </div>
      <div className="text-center mt-4 group">
        <button
          className="px-6 py-2 bg-white text-main rounded-md  sm:w-auto font-bold border border-main hover:bg-main group-hover:text-white transition-colors duration-500 ease-in-out"
          onClick={handleBack}
        >
          Trở về trang chủ
        </button>
      </div>
    </div>
  );
}
