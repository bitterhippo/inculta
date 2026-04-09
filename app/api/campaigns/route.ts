import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";
import { nanoid } from "nanoid";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    const userId = session?.user?.id;

    const body = await req.json();
    const { campaign_name, campaign_size } = body || {};

    const { data, error } = await supabase.from("campaigns").insert([
      {
        id: userId,
        campaign_id: nanoid(21),
        campaign_name,
        campaign_size,
      },
    ]);

    if (error) {
      console.error("POST Campaign Error:", error);
      return NextResponse.json({ status: 500 });
    }
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}

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

    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("GET Campaign Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
