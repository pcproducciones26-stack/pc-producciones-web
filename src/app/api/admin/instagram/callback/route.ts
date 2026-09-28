import { NextRequest, NextResponse } from "next/server";
import {
  exchangeCodeForToken,
  exchangeForLongLivedToken,
} from "@/lib/instagram";
import { saveInstagramConfig, syncInstagramPosts } from "@/lib/instagram-sync";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get("ig_oauth_state")?.value;

  const redirectTo = (status: "connected" | "error", message?: string) => {
    const url = new URL("/admin/instagram", request.url);
    url.searchParams.set("status", status);
    if (message) url.searchParams.set("message", message);
    const response = NextResponse.redirect(url);
    response.cookies.delete("ig_oauth_state");
    return response;
  };

  if (!code || !state || !expectedState || state !== expectedState) {
    return redirectTo("error", "Estado invalido, intenta conectar de nuevo");
  }

  try {
    const shortLived = await exchangeCodeForToken(code);
    const longLived = await exchangeForLongLivedToken(shortLived.access_token);
    const tokenExpiresAt = new Date(Date.now() + longLived.expires_in * 1000);

    await saveInstagramConfig({
      accessToken: longLived.access_token,
      businessAccountId: shortLived.user_id,
      tokenExpiresAt,
    });

    await syncInstagramPosts();

    return redirectTo("connected");
  } catch (error) {
    console.error("[instagram callback]", error);
    return redirectTo("error", "No se pudo conectar la cuenta");
  }
}
