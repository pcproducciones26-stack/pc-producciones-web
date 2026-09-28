import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pastShowApiSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const show = await prisma.pastShow.findUnique({ where: { id } });
  if (!show) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json({ show });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = pastShowApiSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { description, ...rest } = parsed.data;

  try {
    const show = await prisma.pastShow.update({
      where: { id },
      data: {
        ...rest,
        date: new Date(parsed.data.date),
        description: description || null,
      },
    });
    return NextResponse.json({ show });
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.pastShow.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
}
