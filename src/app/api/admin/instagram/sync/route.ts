import { NextResponse } from "next/server";
import { syncInstagramPosts } from "@/lib/instagram-sync";

export async function POST() {
  try {
    const synced = await syncInstagramPosts();
    return NextResponse.json({ ok: true, synced });
  } catch (error) {
    console.error("[instagram sync]", error);
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
