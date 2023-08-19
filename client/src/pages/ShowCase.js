import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./style.css";
import Loader from "../components/Loader";
import NoResultsComponent from "../components/NoResultsComponent";
import * as Unicons from "@iconscout/react-unicons";
import Layout from "./Layout";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ShowCase = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterMenu, setfilterMenu] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Initialize totalPages to 0
  const [selectedImage, setSelectedImage] = useState({ Mask: "", ID: "" });
  const [projectUrl, setProjectUrl] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("seller-token");
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const params = new URLSearchParams(location.search);
  const getParams = params.get("tags");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tagsFromUrl = queryParams.get("tags");
    if (tagsFromUrl) {
      setSelectedTags(tagsFromUrl.split("."));
    }
  }, [location.search]);

  useEffect(() => {
    // Construct the URL based on the selectedImage.mask
    const url = `/project?mask=${selectedImage?.Mask}`;
    setProjectUrl(url);
  }, [selectedImage]);

  useEffect(() => {
    fetchImagesAndTags();
  }, [selectedTags, currentPage]);

  const fetchImagesAndTags = async () => {
    setIsLoading(true);
    try {
      const [imagesResponse, tagsResponse] = await Promise.all([
        axios.get(`https://air-brick-back.vercel.app/api/image/filter?tags=${selectedTags}&page=${currentPage}`), // Join selectedTags to create a single string
        axios.get("https://air-brick-back.vercel.app/api/tag/get"),
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
      queryParams.set("tags", updatedTags.join("."));
    }
    navigate({ search: queryParams.toString() });
    setCurrentPage(1);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1); // Pages are 0-based, but currentPage starts from 1
  };

  const openImagePopup = (Mask, ID) => {
    setSelectedImage({ Mask: Mask, ID: ID });
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  const toggleCategory = (event) => {
    const dropdown = event.currentTarget.closest(".category-dropdown");
    dropdown.classList.toggle("active");
  };

  const renderTagCategory = (category, title) => (
    <div className="categorey">
      <div className="category-title" onClick={toggleCategory}>
        <h2 className="font-semibold">{title}</h2>
        <span>
          <Unicons.UilAngleDown />
        </span>
      </div>
      <div className="category-content">
        <ul className="space-y-2 font-medium">
          {tags[category]
            ?.sort() // Sort the tags alphabetically
            .map((tag, index) => (
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
                  {tag.replace(/_/g, " ").replace(/-/g, "/").toLowerCase()}
                </label>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );

  const CustomPrevArrow = (props) => (
    <div className="slick-arrow custom-prev-arrow" onClick={props.onClick}>
      <span>
        <Unicons.UilAngleLeft />
      </span>
    </div>
  );

  const CustomNextArrow = (props) => (
    <div className="slick-arrow custom-next-arrow" onClick={props.onClick}>
      <span>
        <Unicons.UilAngleRight />
      </span>
    </div>
  );

  const initialSlideIndex = selectedImage
    ? images.findIndex((image) => image?.Mask === selectedImage.Mask && image.ID === selectedImage.ID)
    : 0;

  return (
    <Layout>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-50 w-64 h-screen pt-14 transition-transform ${
          filterMenu ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 `}
        aria-label="Sidebar"
      >
        <div className="flex justify-between px-3 items-center mb-5">
          <h2 className="text-2xl font-bold">Filter</h2>
          <div onClick={() => setfilterMenu(false)} className="bg-teal-200 rounded-md">
            <Unicons.UilTimes />
          </div>
        </div>

        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="category-dropdown active">{renderTagCategory("Work Areas", "Work Areas")}</div>
          <div className="category-dropdown">{renderTagCategory("Meeting Spaces", "Meeting Spaces")}</div>
          <div className="category-dropdown">{renderTagCategory("Support Spaces", "Support Spaces")}</div>

          <div className="category-dropdown">{renderTagCategory("Features", "Features")}</div>
          <div className="category-dropdown">{renderTagCategory("Flooring", "Flooring")}</div>
          <div className="category-dropdown">{renderTagCategory("Lighting", "Lighting")}</div>

          <div className="category-dropdown">{renderTagCategory("Materials", "Materials")}</div>
          <div className="category-dropdown">
            {renderTagCategory("Environmental Graphics", "Environmental Graphics")}
          </div>
          <div className="category-dropdown">{renderTagCategory("Seating & Tables", "Seating & Tables")}</div>
        </div>
      </aside>

      <div className="results-box">
        <div className="px-2 md:px-4 flex justify-center md:justify-between items-center flex-wrap gap-5">
          <div className="flex showcase-tags items-center">
            <Link
              to="/showcase?tags=open_office"
              className={`${
                getParams?.includes("open_office") ? "active" : ""
              } inline-flex items-center px-3 py-2 mr-3 text-xs sm:text-sm font-semibold border-yellow-400 hover:bg-yellow-400 border-2  rounded-full`}
            >
              Open Office
            </Link>

            <Link
              to="/showcase?tags=private_office"
              className={`${
                getParams?.includes("private_office") ? "active" : ""
              } inline-flex items-center px-3 py-2 mr-3 text-xs sm:text-sm font-semibold border-yellow-400 hover:bg-yellow-400 border-2 rounded-full`}
            >
              Private Office
            </Link>

            <Link
              to="/showcase?tags=work_lounge"
              className={`${
                getParams?.includes("work_lounge") ? "active" : ""
              } inline-flex items-center px-3 py-2 mr-3 text-xs sm:text-sm font-semibold border-yellow-400 hover:bg-yellow-400 border-2 rounded-full`}
            >
              Work Lounge
            </Link>
          </div>
          <span
            onClick={() => setfilterMenu(!filterMenu)}
            className="text-sm px-3 py-2 bg-teal-600 text-white rounded-full flex gap-3 cursor-pointer"
          >
            View Filters <Unicons.UilApps size="1.2rem" />
          </span>
        </div>

        <div>
          {isLoading ? (
            <Loader />
          ) : images.length > 0 ? (
            <div className="container showcase-container mx-auto p-2 md:p-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openImagePopup(image?.Mask, image.ID)}
                  className="relative item bg-white overflow-hidden rounded-3xl shadow-md hover:scale-[1.03] hover:shadow-2xl transition duration-300 cursor-pointer"
                >
                  <img
                    src={`https://virtual-tours-india.in/air_brick/content/${image?.Mask}/${image.ID}.jpg`}
                    alt="Image"
                    className="object-cover rounded-3xl w-full h-full"
                  />
                </div>
              ))}

              {selectedImage?.Mask && (
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
                        <div className="p-3 md:p-6">
                          <div className="flex justify-center slider-container ">
                            <Slider
                              arrows
                              infinite
                              speed={500}
                              prevArrow={<CustomPrevArrow />} // Custom previous arrow
                              nextArrow={<CustomNextArrow />}
                              initialSlide={initialSlideIndex}
                              afterChange={(currentSlide) => {
                                const currentImage = images[currentSlide];
                                if (currentImage?.Mask) {
                                  setProjectUrl(`/project?mask=${currentImage?.Mask}`);
                                }
                              }}
                            >
                              {images.map((image, index) => (
                                <div key={index} className="slider-image-container">
                                  <img
                                    src={`https://virtual-tours-india.in/air_brick/content/${image?.Mask}/${image.ID}.jpg`}
                                    className="mx-auto rounded-md slider-img"
                                    alt={`Project ${index}`}
                                  />
                                </div>
                              ))}
                            </Slider>
                          </div>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center justify-end p-5 pt-1 space-x-2 rounded-b">
                          <button
                            onClick={() => window.open(projectUrl, "_blank")}
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

        <div className="flex justify-center m-5">
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
