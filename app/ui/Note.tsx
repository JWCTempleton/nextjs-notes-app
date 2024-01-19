import { format } from "date-fns";

export function Note({
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
  return (
    <div className="mx-auto md:max-w-3xl p-4 mb-8 hover:bg-sky-900 md:border-solid md:border-2 md:rounded-xl md:p-6 md:shadow-lg md:hover:shadow-sky-300/40">
      <p className="text-2xl font-bold mb-6">{content}</p>
      <div className="flex justify-between">
        <p>{name}</p>
        <p>{format(created_at, "MMM dd, yyyy")}</p>
      </div>
    </div>
  );
}
