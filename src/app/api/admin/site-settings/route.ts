import { NextRequest, NextResponse } from "next/server";
import {
  getSiteSettings,
  updateMarqueeArtists,
  updateHeroVideoUrl,
  updateHeroText,
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

  if (
    typeof body.heroTitle === "string" &&
    typeof body.heroSubtitle === "string"
  ) {
    await updateHeroText({
      heroTitle: body.heroTitle.trim(),
      heroSubtitle: body.heroSubtitle.trim(),
      heroCtaLabel:
        typeof body.heroCtaLabel === "string" && body.heroCtaLabel.trim()
          ? body.heroCtaLabel.trim()
          : null,
      heroCtaUrl:
        typeof body.heroCtaUrl === "string" && body.heroCtaUrl.trim()
          ? body.heroCtaUrl.trim()
          : null,
    });
  }

  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}
