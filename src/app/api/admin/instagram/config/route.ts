import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getInstagramConfig } from "@/lib/instagram-sync";

export async function GET() {
  const config = await getInstagramConfig();
  if (!config) {
    return NextResponse.json({ connected: false });
  }
  return NextResponse.json({
    connected: true,
    businessAccountId: config.businessAccountId,
    tokenExpiresAt: config.tokenExpiresAt,
    lastSyncedAt: config.lastSyncedAt,
  });
}

export async function DELETE() {
  await prisma.instagramConfig
    .delete({ where: { id: "singleton" } })
    .catch(() => null);
  return NextResponse.json({ ok: true });
}
