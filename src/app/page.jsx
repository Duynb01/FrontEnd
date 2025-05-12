import ProductCard from "@/components/ProductCard";
import ProductSuper from "@/components/ProductSuper";
import Banner from "@/components/Banner";
import Voucher from "@/components/Voucher";
import Image from "next/image";
import Link from "next/link";
import { CircleChevronRightIcon } from "lucide-react";
export default function Home() {
  const categorys = [
    { name: "Phòng khách", img: "/category/category_1_img.jpg" },
    { name: "Phòng ngủ", img: "/category/category_2_img.jpg" },
    { name: "Phòng ăn và bếp", img: "/category/category_3_img.jpg" },
    { name: "Phòng làm việc", img: "/category/category_4_img.jpg" },
  ];
  return (
    <>
      <div className="wrapper container">
        <section className="home-banner">
          <Banner />
        </section>
        <section className="home-category pt-0">
          <div className="category-content flex justify-between items-center gap-[30px]">
            {categorys.map((category, i) => (
              <div
                key={i}
                className="rounded-md overflow-hidden  w-full h-auto relative shadow-[0px_0px_10px_-5px_rgba(0,_0,_0,_0.1)] group"
              >
                <Link href="">
                  <Image
                    src={category.img}
                    width={350}
                    height={250}
                    className="group-hover:scale-110 transition-transform duration-500"
                    alt={category.name}
                  />
                </Link>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center px-5 py-[10px] w-full">
                  <h3>
                    <Link
                      href=""
                      className="text-main font-bold text-[16px] mdx:text-[18px]"
                    >
                      {category.name}
                    </Link>
                  </h3>
                  <Link href="" className="text-sm text-[#252A2B]">
                    Xem ngay
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="home-product">
          <div className="product-content bg-[#ffeef0] rounded-md py-4 px-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-4 pl-[7px] relative before:content[''] before:bg-main before:rounded-full before:w-2 before:h-2 after:content[''] after:border-main after:rounded-full after:w-2 after:h-2 after:absolute after:border after:animate-pulseSmall">
              <Link href="">Đồ bếp nhập khẩu cao cấp</Link>
            </h2>
            <div className="flex items-center overflow-x-scroll scrollbar-none">
              <ProductSuper />
              <ProductSuper />
              <ProductSuper />
              <ProductSuper />
              <ProductSuper />
            </div>
            <div className="bg-white w-[19%] mx-auto rounded-md overflow-hidden group">
              <Link
                href={"#"}
                className="flex items-center justify-center py-2 gap-3 text-[#333333] group-hover:bg-main group-hover:text-white transition-colors duration-500 ease-in-out"
              >
                <span className="font-bold">Xem tất cả</span>
                <CircleChevronRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        <section className="home-voucher flex flex-wrap pt-0 gap-y-[14px] ">
          <Voucher />
          <Voucher />
          <Voucher />
        </section>
      </div>
    </>
  );
}
