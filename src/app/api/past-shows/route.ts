import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(
    24,
    Math.max(1, Number(searchParams.get("pageSize") ?? "6"))
  );

  const [shows, total] = await Promise.all([
    prisma.pastShow.findMany({
      orderBy: { date: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.pastShow.count(),
  ]);

  return NextResponse.json({
    shows,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  });
}
