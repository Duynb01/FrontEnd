"use client";
import ProductSuper from "@/components/ProductSuper";
import Banner from "@/components/Banner";
import VoucherCard from "@/components/VoucherCard";
import Image from "next/image";
import Link from "next/link";
import { CircleChevronRightIcon } from "lucide-react";
import NewProduct from "@/components/NewProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "@/utils/searchHistory";
import { useRouter } from "next/navigation";
import { setProductWithSearch } from "@/redux/store/slices/searchSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const vouchers = useSelector((state) => state.voucher);
  const products = useSelector((state) => state.product);

  const categories = [
    {
      name: "Phòng khách",
      img: "/category/category_1_img.jpg",
      slug: "phong-khach",
    },
    {
      name: "Phòng ngủ",
      img: "/category/category_2_img.jpg",
      slug: "phong-ngu",
    },
    {
      name: "Phòng ăn và bếp",
      img: "/category/category_3_img.jpg",
      slug: "phong-an-va-bep",
    },
    {
      name: "Phòng làm việc",
      img: "/category/category_4_img.jpg",
      slug: "phong-lam-viec",
    },
  ];
  const handleSearchTrend = (name) => {
    const result = searchProduct(name, products);
    dispatch(
      setProductWithSearch({
        key: name,
        products: result,
      })
    );

    router.push("/search");
  };

  const trendCategorize = [
    {
      name: "Sofa",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_1_img.jpg?v=91",
    },
    {
      name: "Bàn",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_2_img.jpg?v=91",
    },
    {
      name: "Ghế",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_3_img.jpg?v=91",
    },
    {
      name: "Giường",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_4_img.jpg?v=91",
    },
    {
      name: "Nệm",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_5_img.jpg?v=91",
    },
    {
      name: "Đèn",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_6_img.jpg?v=91",
    },
    {
      name: "Bình hoa",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_7_img.jpg?v=91",
    },
    {
      name: "Khung tranh",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_8_img.jpg?v=91",
    },
  ];
  return (
    <>
      <div className="wrapper container ">
        <section className="home-banner">
          <Banner />
        </section>
        <section className="home-category pt-0">
          <div className="category-content grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {categories.map((category, i) => (
              <div
                key={i}
                className="rounded-md overflow-hidden  w-full h-auto relative shadow-[0px_0px_10px_-5px_rgba(0,_0,_0,_0.1)] group"
              >
                <Link href={`/room/${category.slug}`}>
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
        {/* Sản phẩm nổi bật */}
        <section className="home-product-1">
          <div className="product-content bg-[#ffeef0] rounded-md py-4 px-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-4 pl-[7px] relative before:content[''] before:bg-main before:rounded-full before:w-2 before:h-2 after:content[''] after:border-main after:rounded-full after:w-2 after:h-2 after:absolute after:border after:animate-pulseSmall">
              Sản phẩm nổi bật
            </h2>
            <div className="flex items-center overflow-x-scroll scrollbar-none scroll-x-start">
              {products.slice(0, 5).map((product, i) => (
                <Link key={i} href={`/products/${product.id}`}>
                  <ProductSuper product={product} />
                </Link>
              ))}
            </div>
            <div className="bg-white w-[12.5rem] mx-auto rounded-md overflow-hidden group">
              <Link
                href={`/products`}
                className="flex items-center justify-center py-2 gap-3 text-[#333333] group-hover:bg-main group-hover:text-white transition-colors duration-500 ease-in-out"
              >
                <span className="font-bold">Xem tất cả</span>
                <CircleChevronRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        {/* Voucher */}
        <section className="home-voucher grid grid-cols-1 sm:grid-cols-2 mdc:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {vouchers
            .filter((voucher) => voucher.active)
            .map((item, i) => {
              return <VoucherCard voucher={item} key={i} />;
            })}
        </section>
        {/* Ưu đãi */}
        <section className="home-product-2">
          <div className="text-main text-2xl font-bold mb-5 pl-[7px]">
            <h2>Hot This Week</h2>
          </div>
          <div className="flex overflow-x-scroll scrollbar-none scroll-x-start">
            {products.slice(0, 5).map((product, i) => (
              <Link key={i} href={`/products/${product.id}`}>
                <ProductSuper product={product} />
              </Link>
            ))}
          </div>
        </section>
        {/* Xu hướng */}
        <section className="home-trend">
          <div className="trend-content flex items-center px-5 py-[15px] bg-[url('https://theme.hstatic.net/200000796751/1001266995/14/categorize_img.jpg?v=91')] bg-cover bg-no-repeat before:content-[''] before:bg-[rgba(0,0,0,0.35)] before:absolute before:w-full before:h-full before:left-0 before:top-0 relative">
            <div className="text-white relative px-[15px] text-right w-1/6">
              <h3 className="text-lg font-bold mb-2">Xu hướng tìm kiếm</h3>
            </div>
            <div className="relative flex items-center justify-between px-[15px] w-full overflow-x-scroll scrollbar-none scroll-x-start ">
              {trendCategorize.map((item, i) => (
                <div
                  onClick={() => {
                    handleSearchTrend(item.name);
                  }}
                  key={i}
                  className="flex flex-col items-center justify-center px-[15px] cursor-pointer"
                >
                  <div className="w-[90px] h-[90px] bg-white rounded-full p-[10px]">
                    <Image
                      width={100}
                      height={100}
                      src={item.scr}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-white text-sm pt-2 font-medium">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Sản phẩm */}
        <section className="home-product-3">
          <NewProduct />
        </section>
      </div>
    </>
  );
}
