"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import { useDispatch } from "react-redux";
import { getProduct } from "@/lib/api/apiProduct";
import { setProduct } from "@/redux/store/slices/productSlice";
import { getCategory } from "@/lib/api/apiCategory";
import { setCategory } from "@/redux/store/slices/categorySlice";
import { getVoucher } from "@/lib/api/apiVoucher";
import { setVoucher } from "@/redux/store/slices/voucherSlice";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

export default function BaseLayout({ children }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Loader className="w-4 h-4 animate-spin" />
        Đang tải dữ liệu...
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[4.125rem] mdc:pt-[7.375rem] ">
        {children}
      </main>
      <Footer />
    </div>
  );
}
