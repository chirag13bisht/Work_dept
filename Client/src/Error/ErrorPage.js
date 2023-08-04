// ErrorPage.js

import React from 'react';


const ErrorPage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-red-500  mb-4">404</h1>
          <p className="text-3xl text-gray-800 font-semibold mb-2">
            Oops! The page you are looking for is not found.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            It seems like you've entered an incorrect URL or the page has been moved.
          </p>
          <a
            href="/Profile"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-yellow-500 transition delay-150  hover:scale-110 ease-in-out duration-300"
          >
            Go back to Profile
          </a>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;

