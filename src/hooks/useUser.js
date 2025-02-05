"use client";
import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user || null, // Return user data or null
    isLoading: status === "loading",
    isAuthenticated: !!session?.user,
  };
};