import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "singleton";

export const DEFAULT_ARTISTS = [
  "Artista Uno",
  "Artista Dos",
  "Artista Tres",
  "Artista Cuatro",
  "Artista Cinco",
  "Artista Seis",
];

export const DEFAULT_HERO_VIDEO_URL = "/video/hero-bg.mp4";

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: SETTINGS_ID },
  });

  return {
    heroVideoUrl: settings?.heroVideoUrl || DEFAULT_HERO_VIDEO_URL,
    marqueeArtists:
      settings?.marqueeArtists && settings.marqueeArtists.length > 0
        ? settings.marqueeArtists
        : DEFAULT_ARTISTS,
  };
}

export async function updateMarqueeArtists(artists: string[]) {
  return prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, marqueeArtists: artists },
    update: { marqueeArtists: artists },
  });
}

export async function updateHeroVideoUrl(url: string) {
  return prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, heroVideoUrl: url },
    update: { heroVideoUrl: url },
  });
}
