"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Grid 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 justify-items-center">
          {/* Cột 1: Liên hệ */}
          <div>
            <h4 className="font-semibold mb-2">Liên hệ</h4>
            <p>Email: support@noithatabc.vn</p>
            <p>ĐT: 0123 456 789</p>
            <p>Địa chỉ: 123 Đường ABC, TP.HCM</p>
          </div>

          {/* Cột 2: Chính sách */}
          <div>
            <h4 className="font-semibold mb-2">Chính sách</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/chinh-sach-doi-tra">Chính sách đổi trả</Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-hanh">Chính sách bảo hành</Link>
              </li>
              <li>
                <Link href="/bao-mat">Chính sách bảo mật</Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h4 className="font-semibold mb-2">Hỗ trợ khách hàng</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/huong-dan-mua-hang">Hướng dẫn mua hàng</Link>
              </li>
              <li>
                <Link href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</Link>
              </li>
              <li>
                <Link href="/lien-he">Gửi yêu cầu hỗ trợ</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-t pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Nội thất ABC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
