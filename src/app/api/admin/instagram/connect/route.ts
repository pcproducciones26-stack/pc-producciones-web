import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getAuthorizeUrl } from "@/lib/instagram";

export async function GET(request: NextRequest) {
  try {
    const state = randomBytes(16).toString("hex");
    const url = getAuthorizeUrl(state);

    const response = NextResponse.redirect(url);
    response.cookies.set("ig_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10,
    });
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    const redirectUrl = new URL("/admin/instagram", request.url);
    redirectUrl.searchParams.set("status", "error");
    redirectUrl.searchParams.set("message", message);
    return NextResponse.redirect(redirectUrl);
  }
}
