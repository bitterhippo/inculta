import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { userId, campaignId, imageUrl, name } = req.body;

    // For now, just return it
    res.status(200).json({ userId, campaignId, imageUrl, name });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
