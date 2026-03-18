import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    const [
      { data: assetData, error: assetError },
      { data: backdropData, error: backdropError },
    ] = await Promise.all([
      supabase.from("asset").select("*").eq("userId", userId),
      supabase.from("backdrop").select("*").eq("userId", userId),
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
