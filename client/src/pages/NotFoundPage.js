import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-300">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Page not found</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The page you are looking for might be removed or is temporarily unavailable.
        </p>
        <a href="/" className="mt-4 text-blue-500 hover:underline dark:text-blue-400">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
