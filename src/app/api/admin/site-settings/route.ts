import { NextRequest, NextResponse } from "next/server";
import {
  getSiteSettings,
  updateMarqueeArtists,
  updateHeroVideoUrl,
} from "@/lib/site-settings";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  if (Array.isArray(body.marqueeArtists)) {
    const artists = body.marqueeArtists.filter(
      (a: unknown): a is string => typeof a === "string" && a.trim() !== ""
    );
    await updateMarqueeArtists(artists);
  }

  if (typeof body.heroVideoUrl === "string" && body.heroVideoUrl.trim()) {
    await updateHeroVideoUrl(body.heroVideoUrl.trim());
  }

  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}
