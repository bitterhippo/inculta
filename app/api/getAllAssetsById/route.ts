import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    const session = await getServerSession({
      req: { headers: { cookie: cookieHeader } } as any,
      ...authOptions,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user?.id;

    const [
      { data: assetData, error: assetError },
      { data: backdropData, error: backdropError },
    ] = await Promise.all([
      supabase.from("asset").select("*").eq("user_id", userId),
      supabase.from("backdrop").select("*").eq("user_id", userId),
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
