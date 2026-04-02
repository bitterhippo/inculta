import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/library/db";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      user: { email, image, name },
    } = body;

    const { data, error } = await supabase
      .from("users")
      .upsert([{ id: nanoid(21), email, name, image }], {
        onConflict: "email",
      });

    if (error) {
      console.error("Account Creation Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.log("Database Login Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
