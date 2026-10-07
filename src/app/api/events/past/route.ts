import { NextRequest, NextResponse } from "next/server";
import { getEventsPage } from "@/lib/public-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(
    24,
    Math.max(1, Number(searchParams.get("pageSize") ?? "9"))
  );

  return NextResponse.json(await getEventsPage("past", page, pageSize));
}
