import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/provider";
import "@/styles/globals.css";

export const metadata = {
  title: "Trang trí phòng - Baya",
  description: "Trang trí nội thất",
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
