import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteNote } from "../lib/actions";

export function EditNote({ id }: { id: string }) {
  return (
    <Link href={`/notes/${id}/edit`} className="rounded-md">
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteNote({ id }: { id: string }) {
  const deleteNoteWithId = deleteNote.bind(null, id);
  return (
    <form action={deleteNoteWithId}>
      <button className="rounded-md flex h-8 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
