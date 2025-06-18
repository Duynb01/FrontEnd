"use client";
import "@/styles/globals.css";
import Image from "next/image";
import SocialAccount from "@/components/SociaAccount";
import { usePathname } from "next/navigation";
export default function AuthLayout({ children }) {
  const pathName = usePathname();
  let message;

  if (pathName === "/login") {
    message = "Đăng nhập";
  } else {
    message = "Đăng ký";
  }

  return (
    <>
      <div className="w-[30rem] mx-auto my-7 px-5 py-5 border rounded-sm flex flex-col">
        <a href={`/`}>
          <Image
            src="/logo.svg"
            width={120}
            height={120}
            alt="Logo"
            className="mx-auto rounded-full  font-bold"
          />
        </a>
        {children}
        <div>
          <SocialAccount message={message} />
        </div>
      </div>
    </>
  );
}
