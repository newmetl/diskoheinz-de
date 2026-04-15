import { NextResponse, type NextRequest } from "next/server";
import { unsealData } from "iron-session";
import { getSessionOptions, type SessionData } from "@/lib/session";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const options = getSessionOptions();
  const sealed = request.cookies.get(options.cookieName)?.value;

  let isAdmin = false;
  if (sealed) {
    try {
      const data = await unsealData<SessionData>(sealed, {
        password: options.password as string,
        ttl: options.ttl,
      });
      isAdmin = data.isAdmin === true;
    } catch {
      isAdmin = false;
    }
  }

  if (!isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
