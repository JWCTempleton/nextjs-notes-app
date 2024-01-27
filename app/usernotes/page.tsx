import UserNotes from "../ui/UserNotes";
import { fetchUserNotesPages } from "../lib/data";
import Search from "../ui/Search";
import NoteSkeleton from "../ui/noteSkeletons";
import { Suspense } from "react";
import Pagination from "../ui/Pagination";
import { CreateNote } from "../ui/buttons";

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

  const totalPages = await fetchUserNotesPages(query);
  return (
    <div className="flex-col justify-center p-8 w-100">
      <h1 className="text-2xl mb-10">User Notes</h1>
      <Search placeholder="Search notes" />

      <div className="flex justify-center mb-10">
        <CreateNote />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={
          <>
            <NoteSkeleton /> <NoteSkeleton />
          </>
        }
      >
        <UserNotes query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
