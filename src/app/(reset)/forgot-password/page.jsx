"use client";
import { forgotPassword } from "@/lib/api/apiAuth";
import { Loader } from "lucide-react";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await forgotPassword(email);
      setMessage(`${res.message}`);
    } catch (err) {
      setMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="max-w-lg mt-40 mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Quên mật khẩu</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-main text-white py-2 rounded disabled:opacity-50 hover:bg-discount"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Đang xử lý
              </div>
            ) : (
              "Gửi yêu cầu"
            )}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
