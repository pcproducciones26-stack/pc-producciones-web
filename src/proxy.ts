import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { claimsToBeGoogle, isRealGoogleCrawler } from "@/lib/googlebot";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bloquea a los que se hacen pasar por Googlebot (sitios proxy que copian el
  // sitio y le roban la URL canónica en Google).
  if (claimsToBeGoogle(request.headers.get("user-agent"))) {
    const ip =
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0].trim();
    if (ip && !(await isRealGoogleCrawler(ip))) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  const isLoginPage = pathname === "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginApi = pathname === "/api/admin/login";

  const needsAuth =
    (pathname.startsWith("/admin") && !isLoginPage) ||
    (isAdminApi && !isLoginApi);

  if (!needsAuth) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Todo menos los assets estáticos; las rutas no-admin solo pasan por el
  // chequeo de Googlebot.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
