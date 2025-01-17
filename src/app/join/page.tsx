import React from 'react';

const Join = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Become a Nike Member
        </h2>
        <p className="text-center text-gray-600 mb-4 font-bold">
          Create your Nike Member profile and get first access to the very best of Nike products, inspiration, and community.
        </p>
        <form className="space-y-4 font-bold">
          <div>
            <label htmlFor="Email" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="Password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="FullName" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="FullName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-gray-700">
              Country
            </label>
            <select
              id="country"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div>
            <span className="block text-gray-700">Gender</span>
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="male" className="form-radio" />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input type="radio" name="gender" value="female" className="form-radio" />
              <span className="ml-2">Female</span>
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              className="form-checkbox"
            />
            <label htmlFor="newsletter" className="ml-2 text-gray-700">
              Sign up for emails to get updates from Nike on products, offers, and your Member benefits.
            </label>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-black hover:bg-blue-300 text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline"
            >
              Join Us
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          By creating an account, you agree to Nike's Privacy Policy and Terms of Use.
        </p>
      </div>
    </div>
  );
};

export default Join;