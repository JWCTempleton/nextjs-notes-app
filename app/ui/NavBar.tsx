"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="p-4 ml-2 font-bold text-sm md:text-lg">
      <ul className="flex">
        <li className="mr-6">
          <Link
            className={clsx("text-blue-500 hover:text-blue-800", {
              "text-decoration-line: underline text-blue-400": pathname === "/",
            })}
            href="/"
          >
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link
            className={clsx("text-blue-500 hover:text-blue-800", {
              "text-decoration-line: underline text-blue-400":
                pathname === "/notes",
            })}
            href="/notes"
          >
            Notes
          </Link>
        </li>
        <li className="mr-6">
          <Link
            className={clsx("text-blue-500 hover:text-blue-800", {
              "text-decoration-line: underline text-blue-400":
                pathname === "/usernotes",
            })}
            href="/usernotes"
          >
            My Notes
          </Link>
        </li>
        <li className="mr-6">
          <a className="text-blue-500 hover:text-blue-800" href="#">
            Link
          </a>
        </li>
        {/* <li className="mr-6">
          <a className="text-gray-400 cursor-not-allowed" href="#">
            Disabled
          </a>
        </li> */}
      </ul>
    </nav>
  );
}
