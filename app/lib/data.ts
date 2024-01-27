import { sql } from "@vercel/postgres";
import { User, Note } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

export async function fetchNotes() {
  noStore();
  try {
    console.log(`Fetching notes data`);

    const data =
      await sql<Note>`SELECT n.*, u.name FROM notes n JOIN noteUsers u on n.user_id = u.user_id WHERE is_public=true`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch note data.");
  }
}

export async function fetchUserNotes() {
  noStore();
  const session = await auth();
  const userEmail = session?.user?.email;
  try {
    console.log(`Fetching user notes`);

    const data = await sql<Note>`
        SELECT n.*, u.name, u.email FROM notes n JOIN noteUsers u on n.user_id = u.user_id WHERE u.email = ${`${userEmail}`};
        `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch note data.");
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredNotes(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  //   noStore();

  try {
    const filteredNotes = await sql<Note>`
    SELECT n.*, u.name FROM notes n JOIN noteUsers u on n.user_id = u.user_id WHERE is_public=true AND 
        u.name ILIKE ${`%${query}%`} OR
        n.content ILIKE ${`%${query}%`} OR
        n.created_at::text ILIKE ${`%${query}%`}
    ORDER BY n.created_at ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return filteredNotes.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch notes.");
  }
}

export async function fetchNotesPages(query: string) {
  //   noStore();
  try {
    const count = await sql`
            SELECT COUNT(*)
            FROM notes n JOIN noteUsers u on n.user_id = u.user_id WHERE           is_public=true AND
            u.name ILIKE ${`%${query}%`} OR
            n.content ILIKE ${`%${query}%`} OR
            n.created_at::text ILIKE ${`%${query}%`}
        `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of notes.");
  }
}

export async function fetchFilteredUserNotes(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  //   noStore();

  const session = await auth();
  const userEmail = session?.user?.email;

  try {
    // const userId = await sql<User>`
    //     SELECT u.user_id, u.email from noteUsers u WHERE u.email = ${`${userEmail}`}
    // `;

    const filteredUserNotes = await sql<Note>`
    SELECT n.*, u.name, u.email FROM notes n JOIN noteUsers u on n.user_id = u.user_id WHERE u.email = ${`${userEmail}`}
    AND
    (u.email = ${`${userEmail}`} AND n.content ILIKE ${`%${query}%`}) OR
    (u.email = ${`${userEmail}`} AND n.created_at::text ILIKE ${`%${query}%`})
     
      ORDER BY n.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

    return filteredUserNotes.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch notes.");
  }
}

export async function fetchUserNotesPages(query: string) {
  //   noStore();
  const session = await auth();
  const userEmail = session?.user?.email;
  try {
    const count = await sql`
              SELECT COUNT(*)
              FROM notes n JOIN noteUsers u on n.user_id = u.user_id 
              WHERE u.email = ${`${userEmail}`} AND
              u.name ILIKE ${`%${query}%`} OR
              n.content ILIKE ${`%${query}%`} OR
              n.created_at::text ILIKE ${`%${query}%`}
          `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of notes.");
  }
}

export async function fetchNoteById(id: string) {
  noStore();
  try {
    const data = await sql<Note>`
            SELECT * from notes where note_id = ${id}
        `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch note.");
  }
}
