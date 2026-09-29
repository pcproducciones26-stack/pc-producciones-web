import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { instagramPostSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const post = await prisma.instagramPost.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = instagramPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { imageUrl, postUrl, caption, eventDate, venue, city } = parsed.data;

  try {
    const post = await prisma.instagramPost.update({
      where: { id },
      data: {
        imageUrl,
        postUrl: postUrl || null,
        caption: caption || null,
        eventDate: eventDate ? new Date(eventDate) : null,
        venue: venue || null,
        city: city || null,
      },
    });
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.instagramPost.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
}
