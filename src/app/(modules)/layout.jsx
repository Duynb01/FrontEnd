"use client";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React, { useEffect } from "react";
import "@/styles/globals.css";
import { useDispatch } from "react-redux";
import { getProduct } from "@/lib/api/apiProduct";
import { setProduct } from "@/redux/store/slices/productSlice";
import { useSelector } from "react-redux";
import { getCategory } from "@/lib/api/apiCategory";
import { setCategory } from "@/redux/store/slices/categorySlice";

export default function BaseLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      const products = await getProduct();
      if (products) {
        dispatch(setProduct(products));
      }
    };
    const fetchCategory = async () => {
      const categories = await getCategory();
      if (categories) {
        dispatch(setCategory(categories));
      }
    };
    fetchProduct();
    fetchCategory();
  }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
