"use client";
// import { CustomerField } from '@/app/lib/definitions';
import Link from "next/link";
import {
  ExclamationCircleIcon,
  UserPlusIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/Button";
import { useFormState } from "react-dom";
import { createNote } from "@/app/lib/actions";

export default function CreateNoteForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createNote, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 mt-14">
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="note"
                name="note"
                type="text"
                placeholder="New note..."
                aria-describedby="note-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 text-sky-800 font-bold"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-sky-800 peer-focus:text-sky-800" />
            </div>
            <div id="note-error" aria-live="polite" aria-atomic="true">
              {state.errors?.note &&
                state.errors.note.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Note status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-8 ml-8">
              <div className="flex items-center">
                <input
                  id="public"
                  name="public"
                  type="checkbox"
                  aria-describedby="public-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="public"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Make Public <UserPlusIcon className="h-4 w-4" />
                </label>
                {/* <div id="public-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.public &&
                    state.errors.public.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div> */}
              </div>
              <div className="flex items-center">
                <input
                  id="important"
                  name="important"
                  type="checkbox"
                  aria-describedby="important-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="important"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Make Important <ExclamationCircleIcon className="h-4 w-4" />
                </label>
              </div>
              {/* <div id="important-error" aria-live="polite" aria-atomic="true">
                {state.errors?.important &&
                  state.errors.important.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div> */}
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/usernotes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Note</Button>
      </div>
    </form>
  );
}
