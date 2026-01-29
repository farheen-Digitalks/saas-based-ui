import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const authUser = req.cookies.get("authUser")?.value;

  const path = req.nextUrl.pathname;

  // 1️⃣ Not logged in → redirect to login
  if (!token || !authUser) {
    if (path.startsWith("/dashboard") || path.startsWith("/superadmin")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  const user = JSON.parse(authUser);

  if (user.isSuperAdmin && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/superadmin", req.url));
  }

  if (!user.isSuperAdmin && path.startsWith("/superadmin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/superadmin/:path*"],
};
