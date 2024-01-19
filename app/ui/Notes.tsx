import { fetchNotes, fetchFilteredNotes } from "@/app/lib/data";
import { Note } from "./Note";

export default async function Notes({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const notes = await fetchFilteredNotes(query, currentPage);

  return (
    <>
      {notes.map((n) => (
        <Note
          key={n.note_id}
          note_id={n.note_id}
          content={n.content}
          created_at={n.created_at.toString()}
          is_important={n.is_important}
          is_public={n.is_public}
          name={n.name}
        />
      ))}
    </>
  );
}
