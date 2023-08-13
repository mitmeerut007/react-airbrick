// src/pages/Project.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mask = queryParams.get("mask") || "";

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [mask]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/image/project?mask=${mask}`);
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      <h1>Projects with Mask: {mask}</h1>
      <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((image, index) => (
          <div
            key={index}
            onClick={() =>
              openImagePopup(`https://virtual-tours-india.in/air_brick/content/${image.Mask}/${image.ID}.jpg`)
            }
            className="relative group aspect-w-3 aspect-h-4 bg-white overflow-hidden rounded-md shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={`https://virtual-tours-india.in/air_brick/content/${image.Mask}/${image.ID}.jpg`}
              alt="Image"
              className="object-cover rounded-md w-full h-full"
            />
          </div>
        ))}

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pop-backdrop">
            <div className="fixed inset-0 overflow-auto">
              <div className="flex items-center justify-center min-h-screen px-4">
                <div className="relative w-full max-w-5xl mx-auto rounded-lg shadow bg-white dark:bg-gray-700">
                  {/* Modal header */}
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Terms of Service</h3>
                    <button
                      onClick={closeImagePopup}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <Unicons.UilTimes />
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="p-6 space-y-3">
                    <div className="flex justify-center">
                      <img
                        src={selectedImage}
                        className="max-w-5xl h-auto mx-auto rounded-md"
                        style={{ maxHeight: "70vh" }} // Set maximum height for vertical images
                        alt="Selected"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
