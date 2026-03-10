import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let asset;
  try {
    const body = await req.json();
    const { userId, campaignId, imageUrl, name } = body;
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
  }
}
