import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";

export async function GET(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("body", body);

    const { campaign_id } = body;

    const [
      { data: assetData, error: assetError },
      { data: backdropData, error: backdropError },
    ] = await Promise.all([
      supabase.from("asset").select("*").eq("campaign_id", campaign_id),
      supabase.from("backdrop").select("*").eq("campaign_id", campaign_id),
    ]);

    if (assetError || backdropError) {
      console.error("Asset Error:", assetError);
      console.error("Backdrop Error:", backdropError);
      return NextResponse.json(
        { error: assetError?.message || backdropError?.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ backdropData, assetData });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
