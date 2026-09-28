import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getAuthorizeUrl } from "@/lib/instagram";

export async function GET() {
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
}
