import { fetchNoteById } from "@/app/lib/data";
import EditNoteForm from "@/app/ui/EditForm";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const note = await fetchNoteById(id);

  return (
    <div className="mx-auto md:max-w-3xl">
      <EditNoteForm note={note[0]} />
    </div>
  );
}
