import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { EventsPage, PublicInstagramPost } from "@/lib/types";

export async function getEventsPage(
  when: "upcoming" | "past",
  page: number,
  pageSize: number
): Promise<EventsPage> {
  const now = new Date();
  const where = {
    status: "PUBLISHED" as const,
    date: when === "upcoming" ? { gte: now } : { lt: now },
  };

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { date: when === "upcoming" ? "asc" : "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.event.count({ where }),
  ]);

  return {
    events: events.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date.toISOString(),
      venue: event.venue,
      imageUrl: event.imageUrl,
      ticketUrl: event.ticketUrl,
      description: event.description,
    })),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getFeaturedPosts(): Promise<PublicInstagramPost[]> {
  const posts = await prisma.instagramPost.findMany({
    orderBy: [
      { eventDate: { sort: "desc", nulls: "last" } },
      { postedAt: "desc" },
    ],
    take: 18,
  });

  return posts.map((post) => ({
    id: post.id,
    imageUrl: post.imageUrl,
    postUrl: post.postUrl,
    caption: post.caption,
    eventDate: post.eventDate?.toISOString() ?? null,
    venue: post.venue,
    city: post.city,
  }));
}

// Solo los que vienen del sync (externalId), no los cargados a mano en el admin.
export async function getLatestInstagramPosts(): Promise<PublicInstagramPost[]> {
  const posts = await prisma.instagramPost.findMany({
    where: { externalId: { not: null } },
    orderBy: { postedAt: "desc" },
    take: 6,
  });

  return posts.map((post) => ({
    id: post.id,
    imageUrl: post.imageUrl,
    postUrl: post.postUrl,
    caption: post.caption,
    eventDate: post.eventDate?.toISOString() ?? null,
    venue: post.venue,
    city: post.city,
  }));
}

// Feed JSON de Behold (behold.so): respaldo cuando no hay posts del sync propio.
const BEHOLD_FEED_URL = "https://feeds.behold.so/DlvTUDSxjF5jRbMUCmt1";

type BeholdPost = {
  id: string;
  permalink: string;
  caption?: string;
  sizes: { medium: { mediaUrl: string } };
};

// Cacheado 1 día: la home es force-dynamic y cada request a Behold cuenta
// para la cuota del plan gratis.
export const getBeholdPosts = unstable_cache(
  async (): Promise<PublicInstagramPost[]> => {
    try {
      const res = await fetch(BEHOLD_FEED_URL);
      if (!res.ok) return [];
      const { posts } = (await res.json()) as { posts: BeholdPost[] };

      return posts.slice(0, 6).map((post) => ({
        id: post.id,
        // Las URLs de Behold no vencen, a diferencia de las del CDN de Instagram.
        imageUrl: post.sizes.medium.mediaUrl,
        postUrl: post.permalink,
        caption: post.caption ?? null,
        eventDate: null,
        venue: null,
        city: null,
      }));
    } catch {
      return [];
    }
  },
  ["behold-posts"],
  { revalidate: 86400 }
);
