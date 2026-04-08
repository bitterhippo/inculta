import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getServerSession();
    const userId = session?.user?.id;

    const { campaignName, campaignSize } = body || {};

    console.log(userId);

    const { data, error } = await supabase.from("campaigns").insert([
      {
        id: userId,
        campaign_id: nanoid(21),
        campaign_name: campaignName,
        campaign_size: campaignSize,
      },
    ]);

    if (error) {
      console.error("POST Campaign Error:", error);
      return NextResponse.json({ status: 500 });
    }

    return NextResponse.json({ error });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { userId} = body;
//   }
// }
