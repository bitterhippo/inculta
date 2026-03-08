import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, campaignId, imageUrl, name } = body;

  return NextResponse.json({ userId, campaignId, imageUrl, name });
}
