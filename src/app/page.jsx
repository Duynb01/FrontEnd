import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import Image from "next/image";
import Link from "next/link";
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
                    <Link href="" className="text-main font-bold text-[18px]">
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
      </div>
    </>
  );
}
