import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/provider";
import "@/styles/globals.css";

export const metadata = {
  title: "Siêu thị nội thất & trang trí Baya",
  description: "Trang trí nội thất",
  icons: {
    icon: "/favicon.ico", // Đường dẫn tới favicon trong thư mục public
  },
};

export default function RootLayout({ children }) {
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
