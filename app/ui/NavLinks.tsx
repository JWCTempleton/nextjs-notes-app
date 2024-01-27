"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  {
    name: "Notes",
    href: "/notes",
  },
  { name: "My Notes", href: "/usernotes" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <li className="mr-4 md:mx-5" key={link.name}>
            <Link
              href={link.href}
              className={clsx("text-blue-500 hover:text-blue-800", {
                "text-decoration-line: underline text-blue-400":
                  pathname === link.href,
              })}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );
}
