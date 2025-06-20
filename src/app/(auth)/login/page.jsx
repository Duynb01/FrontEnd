"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

import { loginUser } from "@/lib/api/apiAuth";
import { validFormData } from "@/utils/isValidData";
import { setCheckLogin } from "@/redux/store/slices/authSlice";
export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
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
      setLoading(false);
      return;
    }
    try {
      const data = await loginUser(formData);
      if (data.status === "success") {
        dispatch(setCheckLogin(data.user));
        localStorage.setItem("isLogin", "true");
        await router.push("/");
        toast.success("Đăng nhập thành công!");
      }
    } catch (err) {
      toast.error(
        err.message || "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form action="" className="flex flex-col gap-4 items-center my-3">
        <h2 className="uppercase font-bold text-main text-xl">
          đăng nhập hệ thống
        </h2>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
          placeholder="Mật Khẩu"
          required
        />
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full  bg-main text-white py-3 px-4 rounded-md font-bold"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Đang xử lý...
            </div>
          ) : (
            "Đăng nhập"
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
          Chưa có tài khoản?
          <Link
            href={`/register`}
            className="ml-2 text-main font-medium transition-colors"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </>
  );
}
