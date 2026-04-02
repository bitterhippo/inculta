import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const email = session.user?.email;
}
