import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { instagramPostSchema } from "@/lib/validations";

export async function GET() {
  const posts = await prisma.instagramPost.findMany({
    orderBy: [
      { eventDate: { sort: "desc", nulls: "last" } },
      { postedAt: "desc" },
    ],
  });
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = instagramPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { imageUrl, postUrl, caption, eventDate, venue, city } = parsed.data;

  const post = await prisma.instagramPost.create({
    data: {
      imageUrl,
      postUrl: postUrl || null,
      caption: caption || null,
      eventDate: eventDate ? new Date(eventDate) : null,
      venue: venue || null,
      city: city || null,
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}
