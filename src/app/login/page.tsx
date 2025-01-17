import React from "react";

export default function SignIn() {
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
        <h1 className="mt-4 text-[18px] font-bold text-center text-[#111111]">
          YOUR ACCOUNT <br/>FOR EVERYTHING <br/>NIKE
        </h1>
        <form className="mt-6">
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <div className="mb-6 ">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded" />
              <span className="text-black text-sm">Keep me signed in</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgotten your password?
            </a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500 font-medium hover:underline">
            Join Us
          </a>
        </p>
      </div>
    </div>
  );
}