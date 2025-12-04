import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/profile"];
const authPaths = ["/signin", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("refreshToken")?.value;

  if (privatePaths.includes(pathname)) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  if (authPaths.includes(pathname) && sessionToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
