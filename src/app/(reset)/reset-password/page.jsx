"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/lib/api/apiAuth";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !token) {
      toast.error("Link không hợp lệ hoặc đã hết hạn.");
      return;
    }

    setLoading(true);
    const payload = {
      email,
      token,
      newPassword,
    };
    if (newPassword.trim().length < 8) {
      toast.warning("Mật khẩu phải lớn hơn 8 ký tự");
      setLoading(false);
      return;
    }

    try {
      await resetPassword(payload);
      toast.success("Đặt lại mật khẩu thành công! Chuyển hướng...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      toast.error("Token không hợp lệ hoặc đã hết hạn.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mt-40 mx-auto p-6 bg-white rounded-lg shadow ">
      <h1 className="text-xl font-bold mb-4">Đặt lại mật khẩu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-main text-white p-2 rounded hover:bg-discount disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Đang xử lý
            </div>
          ) : (
            "Đổi mật khẩu"
          )}
        </button>
      </form>
    </div>
  );
}
