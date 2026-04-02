import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();

  console.log(req);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const email = session.user?.email;
}
