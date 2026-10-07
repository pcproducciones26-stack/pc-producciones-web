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
