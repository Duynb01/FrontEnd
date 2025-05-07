"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Banner() {
  const images = [
    "/banner/banner_1_img.jpg",
    "/banner/banner_2_img.jpg",
    "/banner/banner_3_img.jpg",
    "/banner/banner_4_img.jpg",
  ];
  const arrows = [
    { name: "left", icon: "<", operator: "-" },
    { name: "right", icon: ">", operator: "+" },
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="banner-content group relative w-full h-[20rem] sm:h-[24rem] md:h-[28rem] mdx:h-[30rem] lg:h-[33rem] rounded-md overflow-hidden">
        <div className="picture absolute inset-0 w-full h-full">
          {images.map((image, i) => (
            <Image
              key={i}
              src={image}
              alt={`Banner ${i + 1}`}
              width={1920}
              height={1080}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>
        <div className="nav-arrow absolute inset-0 flex items-center justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {arrows.map((arrow, i) => (
            <button
              key={i}
              onClick={() =>
                setIndex((prev) =>
                  arrow.operator === "+"
                    ? (prev + 1) % images.length
                    : (prev - 1 + images.length) % images.length
                )
              }
              className="bg-main  text-white px-3 py-2 rounded-sm shadow font-bold text-xl"
            >
              {arrow.icon}
            </button>
          ))}
        </div>
        <div className="nav-dot absolute left-1/2 -translate-x-1/2 flex gap-2 z-20 bottom-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-main scale-125" : "bg-[#928c8c]"
              } transition-all`}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}
