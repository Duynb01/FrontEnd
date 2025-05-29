import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/Provider";
import LayoutWrapper from "@/components/LayoutWrapper";
// import { usePathname } from "next/navigation";

import "@/styles/globals.css";

export const metadata = {
  title: "Siêu thị nội thất & trang trí Baya",
  description: "Trang trí nội thất",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ReduxProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
