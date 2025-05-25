import { useState } from "react";

export default function NavMobile(onClick) {
  console.log("Vô đây: ", onClick);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="pt-4 pb-2 border-t mt-4 block mdc:hidden">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => onNavigate("home")}
              className="text-left text-gray-800 font-medium hover:text-amber-600"
            >
              Trang chủ
            </button>
            <button
              onClick={() => onNavigate("products")}
              className="text-left text-gray-800 font-medium hover:text-amber-600"
            >
              Sản phẩm
            </button>
            <a
              href="/collections"
              className="text-gray-800 font-medium hover:text-amber-600"
            >
              Bộ sưu tập
            </a>
            <a
              href="/about"
              className="text-gray-800 font-medium hover:text-amber-600"
            >
              Về chúng tôi
            </a>
            <a
              href="/contact"
              className="text-gray-800 font-medium hover:text-amber-600"
            >
              Liên hệ
            </a>
            <a
              href="/login"
              className="text-gray-800 font-medium hover:text-amber-600"
            >
              Đăng nhập
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
