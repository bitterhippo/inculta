import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, campaignId, imageUrl, name } = body;

  const asset = await prisma.asset.create({
    data: { userId, campaignId, imageUrl, name },
  });

  return NextResponse.json(asset);
}
