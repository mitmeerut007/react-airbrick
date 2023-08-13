import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./style.css";
import Loader from "../components/Loader";
import NoResultsComponent from "../components/NoResultsComponent";
import * as Unicons from "@iconscout/react-unicons";

const ShowCase = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Initialize totalPages to 0
  const [selectedImage, setSelectedImage] = useState(null);

  const sortedTags = tags.slice().sort();
  const location = useLocation();
  const navigate = useNavigate();

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
        axios.get(`http://localhost:5000/api/image/filter?tags=${selectedTags}&page=${currentPage}`), // Join selectedTags to create a single string
        axios.get("http://localhost:5000/api/image/tags"),
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

  const openImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      Neil Sims
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
          <span
            id="badge-dismiss-green"
            className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300"
          >
            Green
            <button
              type="button"
              className="inline-flex items-center p-1 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
              data-dismiss-target="#badge-dismiss-green"
              aria-label="Remove"
            >
              <svg
                className="w-2 h-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
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
                  className="relative group aspect-w-3 aspect-h-4 bg-white overflow-hidden rounded-md shadow-md hover:shadow-lg transition duration-300"
                >
                  <img
                    src={`https://virtual-tours-india.in/air_brick/content/${image.Mask}/${image.ID}.jpg`}
                    alt="Image"
                    className="object-cover rounded-md w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <button
                      className="text-white text-lg font-semibold"
                      onClick={() =>
                        openImagePopup(`https://virtual-tours-india.in/air_brick/content/${image.Mask}/${image.ID}.jpg`)
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}

              {selectedImage && (
                <div
                  id="defaultModal"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                  <div className="relative w-full max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* Modal header */}
                      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Terms of Service</h3>
                        <button
                          onClick={closeImagePopup}
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="defaultModal"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      {/* Modal body */}
                      <div className="p-6 space-y-6">
                        <img src={selectedImage} className="w-full"/>
                      </div>
                      {/* Modal footer */}
                      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          data-modal-hide="defaultModal"
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          I accept
                        </button>
                        <button
                          data-modal-hide="defaultModal"
                          type="button"
                          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
            //   {images.map((image, index) => (
            //     <div key={index} className="bg-white rounded-xl p-3 shadow-lg">
            //       <img src={`https://virtual-tours-india.in/air_brick/content/${image.Mask}/${image.ID}.jpg`} alt="No Results" className="mx-auto w-full rounded-xl" />
            //       {/* <h3 className="text-xl font-bold">{image.Folder_Name}</h3>
            //       <div className="flex flex-wrap gap-1 my-3">
            //         {image.Final_tags.map((tag, tagIndex) => (
            //           <span
            //             key={tagIndex}
            //             className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300"
            //           >
            //             {tag}
            //           </span>
            //         ))}
            //       </div> */}
            //     </div>
            //   ))}
            // </div>
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
    </div>
  );
};

export default ShowCase;
