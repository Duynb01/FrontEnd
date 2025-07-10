"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/");
      return;
    }

    const timeout = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        🚫 Không đủ quyền truy cập
      </h1>
      <p className="text-gray-700 text-center">
        Bạn sẽ được chuyển hướng về trang chủ sau {timeLeft} giây...
      </p>
    </div>
  );
}
