import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.instagramPost.findMany({
    orderBy: { postedAt: "desc" },
    take: 18,
  });
  return NextResponse.json({ posts });
}
