"use client";
import "@/styles/globals.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLayout } from "@/redux/store/slices/layoutSlice.js";

export default function AuthLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLayout({ showHeader: false, showFooter: false }));
    return () => dispatch(setLayout({ showHeader: true, showFooter: true }));
  }, []);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
