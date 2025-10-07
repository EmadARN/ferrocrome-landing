import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  // اگر مسیر /panel هست و توکن معتبر نیست → هدایت به login
  if (url.pathname.startsWith("/panel")) {
    if (!token || (token.exp && token.exp < Math.floor(Date.now() / 1000))) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // اگر مسیر login هست و کاربر لاگین است → هدایت به panel
  if (
    url.pathname === "/login" &&
    token &&
    (!token.exp || token.exp > Math.floor(Date.now() / 1000))
  ) {
    url.pathname = "/panel";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/login"],
};
