import ReduxProvider from "@/redux/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/styles/globals.css";
import Reload from "@/components/Reload";

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
          <Reload />
          {children}
        </ReduxProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="colored"
        />
      </body>
    </html>
  );
}
