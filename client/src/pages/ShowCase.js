import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./style.css";
import Loader from "../components/Loader";
import NoResultsComponent from "../components/NoResultsComponent";
import * as Unicons from "@iconscout/react-unicons";
import Layout from "./Layout";

const ShowCase = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Initialize totalPages to 0
  const [selectedImage, setSelectedImage] = useState({ mask: "", ID: "" });

  const sortedTags = tags.slice().sort();
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("seller-token");
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tagsFromUrl = queryParams.get("tags");
    if (tagsFromUrl) {
      setSelectedTags(tagsFromUrl.split("-"));
    }
  }, [location.search]);

  useEffect(() => {
    fetchImagesAndTags();
  }, [selectedTags, currentPage]);

  const fetchImagesAndTags = async () => {
    setIsLoading(true);
    try {
      const [imagesResponse, tagsResponse] = await Promise.all([
        axios.get(`https://air-brick-back.vercel.app/api/image/filter?tags=${selectedTags}&page=${currentPage}`), // Join selectedTags to create a single string
        axios.get("https://air-brick-back.vercel.app/api/image/tags"),
      ]);

      setImages(imagesResponse.data.images);
      setTotalPages(imagesResponse.data.totalPages);
      setTags(tagsResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleTagChange = (event) => {
    const tagName = event.target.value;
    const isChecked = event.target.checked;

    let updatedTags = [];

    if (isChecked) {
      updatedTags = [...selectedTags, tagName];
    } else {
      updatedTags = selectedTags.filter((tag) => tag !== tagName);
    }

    setSelectedTags(updatedTags);

    const queryParams = new URLSearchParams();
    if (updatedTags.length > 0) {
      queryParams.set("tags", updatedTags.join("-"));
    }

    navigate({ search: queryParams.toString() });
    setCurrentPage(1);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1); // Pages are 0-based, but currentPage starts from 1
  };

  const openImagePopup = (Mask, ID) => {
    setSelectedImage({ mask: Mask, ID: ID });
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  const goTOProject = (mask) => {
    navigate(`/project?mask=${mask}`);
  };

  return (
    <Layout>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sortedTags.map((tag, index) => (
              <li key={index} className="flex items-center">
                <input
                  id={`tag-${index}`}
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={handleTagChange}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label htmlFor={`tag-${index}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {tag}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="pt-14 sm:ml-64">
        <div className="bg-white p-3 flex">
          <h3 className="font-semibold">Filter</h3>
          <div className="w-px mx-3 bg-gray-300 rounded"></div>
          <span className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
            Green
          </span>
        </div>

        <div>
          {isLoading ? (
            <Loader />
          ) : images.length > 0 ? (
            <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openImagePopup(image.Mask, image.ID)}
                  className="relative group aspect-w-3 aspect-h-4 bg-white overflow-hidden rounded-md shadow-md hover:shadow-lg transition duration-300"
                >
                  <img
                    src={`https://virtual-tours-india.in/air_brick/content/${image.Mask}/${image.ID}.jpg`}
                    alt="Image"
                    className="object-cover rounded-md w-full h-full"
                  />
                </div>
              ))}

              {selectedImage?.mask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pop-backdrop">
                  <div className="fixed inset-0 overflow-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                      <div className="relative w-full max-w-5xl mx-auto rounded-lg shadow bg-white dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Project Details</h3>
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
                              src={`https://virtual-tours-india.in/air_brick/content/${selectedImage.mask}/${selectedImage.ID}.jpg`}
                              className="max-w-3xl h-auto mx-auto rounded-md"
                              style={{ maxHeight: "70vh" }} // Set maximum height for vertical images
                              alt="Selected"
                            />
                          </div>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center justify-end p-5 pt-1 space-x-2 rounded-b">
                          <button
                            onClick={() => goTOProject(selectedImage.mask)}
                            type="button"
                            className="text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg"
                          >
                            View Complete Project
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NoResultsComponent />
          )}
        </div>

        <div className="flex justify-end m-5">
          {totalPages !== 0 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              previousLabel={<Unicons.UilAngleLeftB />}
              nextLabel={<Unicons.UilAngleRightB />}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ShowCase;
