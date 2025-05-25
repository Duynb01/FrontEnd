import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/provider";

// import { usePathname } from "next/navigation";

import "@/styles/globals.css";

export const metadata = {
  title: "Siêu thị nội thất & trang trí Baya",
  description: "Trang trí nội thất",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  // const pathname = usePathname();
  // const hideLayout =
  //   pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ReduxProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
