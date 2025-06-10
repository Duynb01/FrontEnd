import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

import "@/styles/globals.css";

export default function BaseLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
