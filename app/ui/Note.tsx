import { auth } from "@/auth";
import { format } from "date-fns";
import { DeleteNote, EditNote } from "./buttons";

export async function Note({
  note_id,
  name,
  content,
  created_at,
  is_important,
  is_public,
}: {
  note_id: string;
  content: string;
  created_at: string;
  is_important: boolean;
  is_public: boolean;
  name: string;
}) {
  const session = await auth();
  return (
    <div className="mx-auto md:max-w-3xl p-4 mb-8 hover:bg-sky-600 md:border-solid md:border md:rounded-xl md:p-6 md:shadow-lg md:hover:shadow-sky-300/40 ">
      <p className="text-2xl font-bold mb-6">{content}</p>
      <p className="mb-4 font-bold">
        {is_important ? "Important" : "Unimportant"}
      </p>
      <div className="flex justify-between">
        <p>
          {name}
          {!is_public ? ", Private" : ", Public"}
        </p>

        <p>{format(created_at, "MMM dd, yyyy")}</p>
      </div>
      {session?.user?.name === name && (
        <div className="mt-6 flex justify-end gap-8">
          <button className="flex h-8 items-center rounded-lg bg-orange-600 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
            <EditNote id={note_id} />
          </button>

          <DeleteNote id={note_id} />
        </div>
      )}
    </div>
  );
}
