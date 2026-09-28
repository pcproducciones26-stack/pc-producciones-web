import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validations";

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { imageUrl, description, ...rest } = parsed.data;

  const event = await prisma.event.create({
    data: {
      ...rest,
      date: new Date(parsed.data.date),
      imageUrl: imageUrl || null,
      description: description || null,
    },
  });

  return NextResponse.json({ event }, { status: 201 });
}
