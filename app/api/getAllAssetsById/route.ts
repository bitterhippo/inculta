import { NextResponse } from "next/server";
import { getAssetsByCampaignId } from "@/app/services/assets";

export async function GET(req) {
  const { searchParams } = await new URL(req.url);
  const campaign_id = searchParams.get("campaign_id");

  const data = await getAssetsByCampaignId(campaign_id);

  return NextResponse.json(data);
}
