import { fetchFilteredUserNotes } from "../lib/data";
import { Note } from "./Note";

export default async function UserNotes({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const filteredUserNotes = await fetchFilteredUserNotes(query, currentPage);

  return (
    <div className="mx-auto">
      {filteredUserNotes.length === 0 && (
        <p className="text-lg mx-auto mb-6 font-bold">
          Please click Create Note button to get started.
        </p>
      )}
      {filteredUserNotes.map((n) => (
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
    </div>
  );
}
