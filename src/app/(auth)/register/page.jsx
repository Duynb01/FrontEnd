"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { registerUser } from "@/lib/api/apiAuth";

import { validFormData } from "@/utils/isValidData";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = validFormData(formData);

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return setLoading(false);
    }
    try {
      await registerUser(formData);
      toast.success("Đăng ký thành công!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      toast.error(
        err.message || "Đăng ký thất bại, vui lòng kiểm tra lại thông tin!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center my-3"
      >
        <h2 className="uppercase font-bold text-main text-xl">
          đăng ký tài khoản
        </h2>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
          placeholder="Họ tên .."
          required
        />

        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
          placeholder="Email .."
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
          placeholder="Mật Khẩu .."
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full  bg-main text-white py-3 px-4 rounded-md font-bold "
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Đang xử lý...
            </div>
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>
      <div></div>
      {/* Quên mật khẩu Sẽ suy nghĩ thêm sau*/}
      {/* <div className="text-right">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Quên mật khẩu?
          </button>
        </div> */}

      {/* Toggle to Register */}
      <div className="text-center">
        <p className="text-gray-600">
          Nếu đã có tài khoản?
          <Link
            href={`/login`}
            className="ml-2 text-main font-medium transition-colors"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </>
  );
}
