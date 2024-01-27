import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUserNotes = nextUrl.pathname.startsWith("/usernotes");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnSignUp = nextUrl.pathname.startsWith("/signup");

      if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL("/notes", nextUrl));
        return true;
      }

      if (isOnSignUp) {
        if (isLoggedIn)
          return Response.redirect(new URL("/usernotes", nextUrl));
        return true;
      }

      if (isOnUserNotes) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } //else if (isLoggedIn) {
      //     return Response.redirect(new URL("/usernotes", nextUrl));
      //   }

      return true;
    },
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
