"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const RegisterForm = ({ onSubmit, onToggle }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = () => {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }

      onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    };

    return (
      <div className="space-y-6">
        {/* Họ và Tên */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Họ và Tên
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Nhập họ và tên"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="register-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="register-email"
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
            htmlFor="register-password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="register-password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Nhập mật khẩu"
          />
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Nhập lại mật khẩu"
          />
        </div>

        {/* Submit button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-105"
        >
          Đăng Ký
        </button>

        {/* Toggle to Login */}
        <div className="text-center">
          <p className="text-gray-600">
            Đã có tài khoản?
            <button
              type="button"
              onClick={onToggle}
              className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>
    );
  };
}
