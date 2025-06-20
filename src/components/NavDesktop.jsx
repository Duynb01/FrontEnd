"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";

export default function NavDesktop() {
  // console.log(categories);
  const categories = useSelector((state) => state.category);
  // console.log(category);/

  return (
    <>
      <nav className="bg-[#f2f2f2] hidden mdc:block">
        <ul className="max-w-7xl mx-auto px-4  flex flex-wrap items-center gap-x-6 text-sm font-medium text-gray-700 justify-center">
          {categories.map((category, index) => (
            <li
              className="relative group min-h-[52px] flex items-center"
              key={index}
            >
              <Link
                href={`/products/category/${category.slug}`}
                className=" flex items-center text-main uppercase py-2"
              >
                {category.name}
                {/* <ChevronDown className="w-4 h-4 inline-block transform transition-transform duration-300 group-hover:rotate-180 text-main" /> */}
              </Link>
              {/*Menu phụ*/}
              {category.child && (
                <ul
                  className="absolute min-w-[220px] shadow-[0px_6px_15px_rgb(0,0,0,0.2)] left-0 top-full bg-white opacity-0 translate-y-8 pointer-events-none transform transition duration-300 ease 
  group-hover:opacity-100 group-hover:translate-y-[0.5px] group-hover:pointer-events-auto"
                >
                  {category.childs.map((child, index) => (
                    <li
                      key={index}
                      className={`py-[9px] px-[18px] overflow-hidden cursor-pointer hover:font-bold ${
                        index !== category.childs.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      {child}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
