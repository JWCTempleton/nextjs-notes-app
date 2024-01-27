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
    <div className="flex-col justify-center p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-10 font-bold">Notes Page</h1>
      <Search placeholder="Search notes" />

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
