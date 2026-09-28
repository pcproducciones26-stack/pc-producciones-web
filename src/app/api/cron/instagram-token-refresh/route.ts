import { NextRequest, NextResponse } from "next/server";
import { refreshInstagramTokenIfNeeded } from "@/lib/instagram-sync";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const result = await refreshInstagramTokenIfNeeded();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("[cron instagram-token-refresh]", error);
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
