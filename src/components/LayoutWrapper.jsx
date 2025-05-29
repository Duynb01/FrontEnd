"use client";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const { showHeader, showFooter } = useSelector((state) => state.layout);

  return (
    <>
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
