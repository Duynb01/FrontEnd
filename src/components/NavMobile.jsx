"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Menu } from "lucide-react";

export default function NavMobile({ categories }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const onShowMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleCategory = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <button onClick={onShowMenu}>
        <Menu className="w-8 h-8 text-white" />
      </button>
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onShowMenu}
      ></div>

      <div
        className={`z-50 p-4 block bg-white mdc:hidden w-[40%] fixed inset-0 transform transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-none ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between ">
          <Link href="/" className="text-3xl font-bold text-main">
            BAYA
          </Link>
          <button onClick={onShowMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-10">
          <ul className="flex flex-col gap-1">
            {categories.map((category, index) => (
              <React.Fragment key={category.name}>
                <li
                  key={index}
                  onClick={() => toggleCategory(index)}
                  className="group shadow-[0px_6px_15px_rgb(149,157,165,0.2)] p-3 hover:bg-slate-300"
                >
                  <Link
                    href={"#"}
                    className=" text-main font-bold text-md flex items-center justify-between"
                  >
                    {category.name}
                    <ChevronDown
                      className={`size-4 text-main transform transition-transform duration-300  ${
                        openIndex === index ? "rotate-180" : ""
                      } `}
                    />
                  </Link>
                </li>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul>
                    {category.childs.map((child, index) => (
                      <li
                        key={index}
                        className={`py-[9px] px-[18px] cursor-pointer hover:font-bold ${
                          index !== category.childs.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                      >
                        {child}
                      </li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
