import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, campaignId, imageUrl, name } = body;

    {
      /*TODO: This needs to be updated radically - it will work for testing purposes */
    }
    const { data, error } = await supabase.from("Asset").insert([
      {
        id: nanoid(6),
        userId: userId,
        campaignId: campaignId,
        imageUrl: imageUrl,
        createdAt: new Date(),
      },
    ]);

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
