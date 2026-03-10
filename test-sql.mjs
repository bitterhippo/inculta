import "dotenv/config";
import { Client } from "pg";

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // your Postgres URL
  });

  await client.connect();

  // Simple insert to replicate your Prisma test
  const res = await client.query(
    `INSERT INTO asset ("userId", "campaignId", "imageUrl", "name")
     VALUES ($1, $2, $3, $4) RETURNING *`,
    ["1", "1", "https://example.com/test.png", "test asset"],
  );

  console.log(res.rows[0]);

  await client.end();
}

main().catch(console.error);
