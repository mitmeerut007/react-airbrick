import React from "react";
import noResultsImage from "../assets/no-result.png"; // Replace with your image path

const NoResultsComponent = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh_-_10rem)]">
      <div className="text-center bg-white p-5 rounded-xl">
        <img src={noResultsImage} alt="No Results" className="mx-auto w-40 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No Results Found</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Sorry, there are no results matching your search.
        </p>
      </div>
    </div>
  );
};

export default NoResultsComponent;
