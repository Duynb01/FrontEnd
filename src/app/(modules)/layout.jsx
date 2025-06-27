"use client";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React, { useEffect } from "react";
import "@/styles/globals.css";
import { useDispatch } from "react-redux";
import { getProduct } from "@/lib/api/apiProduct";
import { setProduct } from "@/redux/store/slices/productSlice";
import { getCategory } from "@/lib/api/apiCategory";
import { setCategory } from "@/redux/store/slices/categorySlice";
import { getVoucher } from "@/lib/api/apiVoucher";
import { setVoucher } from "@/redux/store/slices/voucherSlice";
import { toast } from "react-toastify";

export default function BaseLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    // const fetchProduct = async () => {
    //   const products = await getProduct();
    //   if (products) {
    //     dispatch(setProduct(products));
    //   }
    // };
    // const fetchCategory = async () => {
    //   const categories = await getCategory();
    //   if (categories) {
    //     dispatch(setCategory(categories));
    //   }
    // };
    // const fetchVoucher = async () => {
    //   const vouchers = await getVoucher();
    //   if (vouchers) {
    //     dispatch(setVoucher(vouchers));
    //   }
    // };
    // fetchProduct();
    // fetchCategory();
    // fetchVoucher();

    const fetchData = async () => {
      try {
        const [products, categories, vouchers] = await Promise.all([
          getProduct(),
          getCategory(),
          getVoucher(),
        ]);

        if (products) dispatch(setProduct(products));
        if (categories) dispatch(setCategory(categories));
        if (vouchers) dispatch(setVoucher(vouchers));
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
