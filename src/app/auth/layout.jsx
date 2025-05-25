import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/provider";
import "@/styles/globals.css";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
