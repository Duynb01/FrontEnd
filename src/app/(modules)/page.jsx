import ProductCard from "@/components/ProductCard";
import ProductSuper from "@/components/ProductSuper";
import Banner from "@/components/Banner";
import Voucher from "@/components/Voucher";
import SocialAccount from "@/components/SociaAccount";
import Image from "next/image";
import Link from "next/link";
import { CircleChevronRightIcon } from "lucide-react";

// export async function g(params) {

// }

export default function Home() {
  const categorys = [
    { name: "Phòng khách", img: "/category/category_1_img.jpg" },
    { name: "Phòng ngủ", img: "/category/category_2_img.jpg" },
    { name: "Phòng ăn và bếp", img: "/category/category_3_img.jpg" },
    { name: "Phòng làm việc", img: "/category/category_4_img.jpg" },
  ];
  const products = [
    {
      supplier: "anne",
      name: "Bát ăn cơm gốm sứ ANNE màu ngẫu nhiên H5.7xD11.3",
      src: "https://product.hstatic.net/200000796751/product/2002527.2_acffaf6d910445b1b29e0593ff392ba5.jpg",
      price: "45000",
      discount: "30",
    },
    {
      supplier: "anne",
      name: "Bát ăn snack gốm sứ ANNE màu ngẫu nhiên H6.5xD11.5",
      src: "https://product.hstatic.net/200000796751/product/2002535_5b3eede60829490499619fabe5dbd0a9.jpg",
      price: "55000",
    },
    {
      supplier: "anne",
      name: "Bát canh gốm sứ ANNE màu ngẫu nhiên H10xD21",
      src: "https://product.hstatic.net/200000796751/product/2002531.1_1f7d224fe4ce45e088a0bc835159b856.jpg",
      price: "65000",
    },
    {
      supplier: "anne",
      name: "Bát ăn cơm gốm sứ ANNE màu ngẫu nhiên H5.7xD11.3",
      src: "https://product.hstatic.net/200000796751/product/2002527.2_acffaf6d910445b1b29e0593ff392ba5.jpg",
      price: "45000",
      discount: "30",
    },
    {
      supplier: "anne",
      name: "Bát ăn snack gốm sứ ANNE màu ngẫu nhiên H6.5xD11.5",
      src: "https://product.hstatic.net/200000796751/product/2002535_5b3eede60829490499619fabe5dbd0a9.jpg",
      price: "55000",
    },
    {
      supplier: "anne",
      name: "Bát canh gốm sứ ANNE màu ngẫu nhiên H10xD21",
      src: "https://product.hstatic.net/200000796751/product/2002531.1_1f7d224fe4ce45e088a0bc835159b856.jpg",
      price: "65000",
    },
    {
      supplier: "anne",
      name: "Bát ăn cơm gốm sứ ANNE màu ngẫu nhiên H5.7xD11.3",
      src: "https://product.hstatic.net/200000796751/product/2002527.2_acffaf6d910445b1b29e0593ff392ba5.jpg",
      price: "45000",
      discount: "30",
    },
    {
      supplier: "anne",
      name: "Bát ăn snack gốm sứ ANNE màu ngẫu nhiên H6.5xD11.5",
      src: "https://product.hstatic.net/200000796751/product/2002535_5b3eede60829490499619fabe5dbd0a9.jpg",
      price: "55000",
    },
    {
      supplier: "anne",
      name: "Bát canh gốm sứ ANNE màu ngẫu nhiên H10xD21",
      src: "https://product.hstatic.net/200000796751/product/2002531.1_1f7d224fe4ce45e088a0bc835159b856.jpg",
      price: "65000",
    },
    {
      supplier: "anne",
      name: "Bát ăn cơm gốm sứ ANNE màu ngẫu nhiên H5.7xD11.3",
      src: "https://product.hstatic.net/200000796751/product/2002527.2_acffaf6d910445b1b29e0593ff392ba5.jpg",
      price: "45000",
      discount: "30",
    },
  ];
  const productSuper = [
    {
      supplier: "anne",
      name: "Bát ăn cơm gốm sứ ANNE màu ngẫu nhiên H5.7xD11.3",
      src: "https://product.hstatic.net/200000796751/product/2002527.2_acffaf6d910445b1b29e0593ff392ba5.jpg",
      price: "45000",
      discount: "30",
    },
    {
      supplier: "anne",
      name: "Bát ăn snack gốm sứ ANNE màu ngẫu nhiên H6.5xD11.5",
      src: "https://product.hstatic.net/200000796751/product/2002535_5b3eede60829490499619fabe5dbd0a9.jpg",
      price: "55000",
      discount: "60",
    },
    {
      supplier: "anne",
      name: "Bát canh gốm sứ ANNE màu ngẫu nhiên H10xD21",
      src: "https://product.hstatic.net/200000796751/product/2002531.1_1f7d224fe4ce45e088a0bc835159b856.jpg",
      price: "65000",
      discount: "30",
    },
    {
      supplier: "anne",
      name: "Bát ăn snack gốm sứ ANNE màu ngẫu nhiên H6.5xD11.5",
      src: "https://product.hstatic.net/200000796751/product/2002535_5b3eede60829490499619fabe5dbd0a9.jpg",
      price: "55000",
      discount: "60",
    },
    {
      supplier: "anne",
      name: "Bát canh gốm sứ ANNE màu ngẫu nhiên H10xD21",
      src: "https://product.hstatic.net/200000796751/product/2002531.1_1f7d224fe4ce45e088a0bc835159b856.jpg",
      price: "65000",
      discount: "30",
    },
  ];
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
      name: "Lọ hoa",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_7_img.jpg?v=91",
    },
    {
      name: "Khung ảnh",
      scr: "https://theme.hstatic.net/200000796751/1001266995/14/categorize_8_img.jpg?v=91",
    },
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
        <section className="home-product-1">
          <div className="product-content bg-[#ffeef0] rounded-md py-4 px-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-4 pl-[7px] relative before:content[''] before:bg-main before:rounded-full before:w-2 before:h-2 after:content[''] after:border-main after:rounded-full after:w-2 after:h-2 after:absolute after:border after:animate-pulseSmall">
              <Link href="">Sản phẩm nổi bật</Link>
            </h2>
            <div className="flex items-center overflow-x-scroll scrollbar-none">
              {productSuper.map((product, i) => (
                <ProductSuper key={i} product={product} />
              ))}
            </div>
            <div className="bg-white w-[19%] mx-auto rounded-md overflow-hidden group">
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
        <section className="home-voucher flex flex-wrap pt-0 gap-y-[14px] ">
          <Voucher />
          <Voucher />
          <Voucher />
        </section>
        <section className="home-product-2">
          <div className="text-main text-2xl font-bold mb-5 pl-[7px]">
            <h2>
              <Link href={""}>Back To School - Up To 60%</Link>
            </h2>
          </div>
          <div className="flex">
            {productSuper.map((product, i) => (
              <ProductSuper key={i} product={product} />
            ))}
          </div>
        </section>
        <section className="home-trend">
          <div className="trend-content flex items-center px-5 py-[15px] bg-[url('https://theme.hstatic.net/200000796751/1001266995/14/categorize_img.jpg?v=91')] bg-cover bg-no-repeat before:content-[''] before:bg-[rgba(0,0,0,0.35)] before:absolute before:w-full before:h-full before:left-0 before:top-0 relative">
            <div className="text-white relative px-[15px] text-right w-1/6">
              <h3 className="text-lg font-bold mb-2">Xu hướng tìm kiếm</h3>
              <Link
                href={""}
                className="uppercase text-[13px] px-[15px] py-[5px] bg-[#C31425] rounded-full"
              >
                xem ngay
              </Link>
            </div>
            <div className="relative flex items-center justify-between px-[15px] w-full overflow-x-scroll scrollbar-none">
              {trendCategorize.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center px-[15px]"
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
        <section className="home-product-3">
          <div>
            <h2 className="text-main text-2xl font-bold mb-5">
              <Link href={""}>Sản phẩm mới</Link>
            </h2>
            <div className="flex items-start">
              <div className="sidebar max-w-[20%] bg-black mdc:block hidden">
                <Image
                  src="https://theme.hstatic.net/200000796751/1001266995/14/home_coll_1_banner.jpg?v=91"
                  width={1500}
                  height={3764}
                  alt=""
                  className="w-full h-full object-cover "
                />
              </div>
              <div className="product-content max-w-[80%] grid mdc:grid-rows-2 mdc:grid-cols-5 gap-4 grid-rows-2 grid-cols-5 w-full">
                {products.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </div>
            </div>
            <div>
              <Link href={`/products`}>
                <div className="flex items-center justify-center py-2 gap-3 text-[#333333] group-hover:bg-main group-hover:text-white transition-colors duration-500 ease-in-out">
                  <span className="font-bold">Xem tất cả</span>
                  <CircleChevronRightIcon className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
