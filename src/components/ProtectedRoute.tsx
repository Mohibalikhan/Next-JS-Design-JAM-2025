"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If no session, redirect to login
    if (!session) {
      router.push("/login");
    }
    
  }, [session, router]);

  // Show loading state until session is verified
  if (session === undefined) {
    return <div>Loading...</div>;
  }

  // Render children if user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;