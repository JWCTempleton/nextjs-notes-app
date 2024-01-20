import Search from "../ui/Search";
import Notes from "../ui/Notes";
import { Suspense } from "react";
import NoteSkeleton from "../ui/noteSkeletons";
import Pagination from "../ui/Pagination";
import { fetchNotesPages } from "../lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchNotesPages(query);

  return (
    <div className="flex-col justify-center p-8 w-100">
      <h1 className="text-2xl mb-10">Notes Page</h1>
      <Search placeholder="Search notes" />
      {/* {notes.map((n) => (
        <Note
          key={n.note_id}
          note_id={n.note_id}
          content={n.content}
          created_at={n.created_at.toString()}
          is_important={n.is_important}
          is_public={n.is_public}
          name={n.name}
        />
      ))} */}
      <Suspense
        key={query + currentPage}
        fallback={
          <>
            <NoteSkeleton /> <NoteSkeleton />
          </>
        }
      >
        <Notes query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
