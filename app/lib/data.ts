import { sql } from "@vercel/postgres";
import { User, Note } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchNotes() {
  noStore();
  try {
    console.log(`Fetching notes data`);

    const data =
      await sql<Note>`SELECT n.*, u.name FROM notes n JOIN noteUsers u on n.user_id = u.user_id WHERE is_public=true`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
