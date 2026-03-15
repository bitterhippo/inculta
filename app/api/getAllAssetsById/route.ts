import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    const { data, error } = await supabase
      .from("asset")
      .select("*")
      .eq("userId", userId);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
