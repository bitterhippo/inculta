import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      user: { email, image, name },
    } = body;

    const { data, error } = await supabase.from("users").insert([
      {
        id: nanoid(21),
        email,
        image,
        name,
      },
    ]);
  } catch (err) {
    console.log("database login error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
