import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    const [{ data: assetData, error: assetError }] = await Promise.all([
      supabase.from("campaigns").select("*").eq("userId", userId),
    ]);

    if (assetError) {
      console.error("Asset Error:", assetError);
      return NextResponse.json({ status: 500 });
    }

    return NextResponse.json({ assetData });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
