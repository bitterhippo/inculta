import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../library/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, campaignId, imageUrl, name } = body;

    const asset = await prisma.asset.create({
      data: { userId, campaignId, imageUrl, name },
    });

    return NextResponse.json(asset);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
