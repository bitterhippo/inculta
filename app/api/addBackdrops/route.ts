import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    const session = await getServerSession({
      req: { headers: { cookie: cookieHeader } } as any,
      ...authOptions,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session?.user?.id;
    const body = await req.json();
    const { campaign_id, image_url, label } = body;

    {
      /*TODO: This needs to be updated radically - it will work for testing purposes */
    }
    const { data, error } = await supabase.from("backdrop").insert([
      {
        id: nanoid(21),
        user_id,
        campaign_id,
        image_url,
        label,
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
