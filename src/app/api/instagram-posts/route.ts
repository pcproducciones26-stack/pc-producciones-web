import { NextResponse } from "next/server";
import { getFeaturedPosts } from "@/lib/public-data";

export async function GET() {
  return NextResponse.json({ posts: await getFeaturedPosts() });
}
