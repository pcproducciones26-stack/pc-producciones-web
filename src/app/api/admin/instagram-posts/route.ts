import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { instagramPostSchema } from "@/lib/validations";

export async function GET() {
  const posts = await prisma.instagramPost.findMany({
    orderBy: { postedAt: "desc" },
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

  const { imageUrl, postUrl, caption } = parsed.data;

  const post = await prisma.instagramPost.create({
    data: {
      imageUrl,
      postUrl: postUrl || null,
      caption: caption || null,
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}
