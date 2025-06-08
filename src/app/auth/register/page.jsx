"use client";

import SocialAccount from "@/components/SociaAccount";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const message = "Đăng ký";

  const [formData, setFormData] = useState({
    name: "",
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
  // shadow-[0px_1px_4px_rgb(0, 0, 0, 0.16)]
  return (
    <>
      <div className="w-[30rem] mx-auto my-7 px-5 py-5 border rounded-sm flex flex-col">
        <Link href={`/`}>
          <Image
            src="/logo.svg"
            width={120}
            height={120}
            alt="Logo"
            className="mx-auto rounded-full  font-bold"
          />
        </Link>
        <form action="" className="flex flex-col gap-4 items-center my-3">
          <h2 className="uppercase font-bold text-main text-xl">
            đăng ký tài khoản
          </h2>
          <input
            type="text"
            id="fullname"
            name="fullname"
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
            type="button"
            onClick={handleSubmit}
            className="w-full  bg-main text-white py-3 px-4 rounded-md font-bold "
          >
            Đăng Ký
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
        <div>
          <SocialAccount message={message} />
        </div>
      </div>
    </>
  );
}
