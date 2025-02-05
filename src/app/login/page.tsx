"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SignIn() {
  const { data: session } = useSession();

  return (
    <div className="flex mt-10 justify-center mb-10 bg-[#FFFFFF]">
      <div className="w-[90%] max-w-[380px] h-auto bg-[#FFFFFF] px-6">
        <div className="text-center mb-6">
          <img 
          src="NIKE.png"
          alt="Nike Logo" 
          className="mx-auto w-15 h-8" 
          />
        </div>

        {session ? (
          <div className="text-center">
            <img 
              src={session.user?.image??"default-profile.png"} 
              alt="User Profile" 
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-lg font-bold">{session.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <h1 className="mt-4 text-[18px] font-bold text-center text-[#111111]">
              YOUR ACCOUNT <br /> FOR EVERYTHING <br /> NIKE
            </h1>

            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-2 bg-white border py-2 rounded-md hover:bg-gray-100 text-black mb-3"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <button
              onClick={() => signIn("facebook")}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-3"
            >
              <FaFacebook className="text-xl" />
              Continue with Facebook
            </button>
          </>
        )}
      </div>
    </div>
  );
}