import { auth, signOut } from "@/auth";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NavBar() {
  const session = await auth();

  // Date.parse(session.expires) > Date.now()
  //   ? console.log("TRUE")
  //   : console.log("False");

  return (
    <nav className="ml-4 md:max-w-4xl md:mx-auto mt-4 font-bold text-sm md:text-lg">
      <ul className="flex justify-between">
        <div className="flex">
          <NavLinks />
        </div>
        {/* <Link
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
          </Link> */}
        <div>
          {!session ? (
            <div className="flex">
              <li className="mr-6">
                <Link
                  className={"text-blue-500 hover:text-blue-800"}
                  href="/login"
                >
                  Login
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  className={"text-blue-500 hover:text-blue-800"}
                  href="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </div>
          ) : (
            <div className="flex gap-6 flex-row">
              <p>
                <span className="hidden md:inline">Welcome,</span>
                <span className="ml-2">{session.user?.name}</span>
              </p>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                  redirect("/notes");
                }}
              >
                <li className="mr-6">
                  <button className="text-blue-500 hover:text-blue-800">
                    Sign Out
                  </button>
                </li>
              </form>
            </div>
          )}
        </div>
      </ul>
      {/* <li className="mr-6">
          <a className="text-gray-400 cursor-not-allowed" href="#">
            Disabled
          </a>
        </li> */}
    </nav>
  );
}
