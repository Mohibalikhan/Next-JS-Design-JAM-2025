// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add `id` property to session.user
    } & DefaultSession["user"]; // Inherit other properties from DefaultSession
  }

  interface User extends DefaultUser {
    id: string; // Add `id` to User
  }

  interface JWT {
    id: string; // Add `id` to JWT
  }
}
