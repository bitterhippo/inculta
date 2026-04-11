import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";
import { getAssetsByCampaignId } from "@/app/services/assets";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const campaign_id = searchParams.get("campaign_id");

  const data = await getAssetsByCampaignId(campaign_id);

  return NextResponse.json(data);
}
