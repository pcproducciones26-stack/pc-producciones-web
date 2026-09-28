import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pastShowApiSchema } from "@/lib/validations";

export async function GET() {
  const shows = await prisma.pastShow.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json({ shows });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = pastShowApiSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { description, ...rest } = parsed.data;

  const show = await prisma.pastShow.create({
    data: {
      ...rest,
      date: new Date(parsed.data.date),
      description: description || null,
    },
  });

  return NextResponse.json({ show }, { status: 201 });
}
