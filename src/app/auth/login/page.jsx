"use client";

import SocialAccount from "@/components/SociaAccount";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    //   onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Nhập email"
        />
      </div>

      {/* Mật khẩu */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Nhập mật khẩu"
        />
      </div>

      {/* Quên mật khẩu */}
      <div className="text-right">
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Quên mật khẩu?
        </button>
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105"
      >
        Đăng Nhập
      </button>

      {/* Toggle to Register */}
      <div className="text-center">
        <p className="text-gray-600">
          Chưa có tài khoản?
          <button
            type="button"
            //   onClick={onToggle}
            className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
      <div>
        <SocialAccount />
      </div>
    </div>
  );
}
