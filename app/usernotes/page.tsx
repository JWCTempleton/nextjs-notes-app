import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import UserNotes from "../ui/UserNotes";
import { fetchUserNotesPages } from "../lib/data";
import Search from "../ui/Search";
import NoteSkeleton from "../ui/noteSkeletons";
import { Suspense } from "react";
import Pagination from "../ui/Pagination";

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

export function CreateNote() {
  return (
    <Link
      href="/usernotes/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Note</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
