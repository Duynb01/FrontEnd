import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("access_token")?.value;
    if (!token) {
      console.log("CheckToken: ", token);

      // return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // Gọi API BE để xác minh token
      const response = await fetch(
        "https://api-furniture-x2jh.onrender.com/auth/verify-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`, // Gửi cookie
          },
          credentials: "include", // Gửi cookie cross-domain
        }
      );
      const data = await response.json();
      if (!response.ok || data.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
