import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) return NextResponse.redirect(new URL("/", request.url));

  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
