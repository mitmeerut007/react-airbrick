import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "./Layout";

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mask = queryParams.get("mask") || "";

  const token = localStorage.getItem("seller-token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [mask]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`https://airbrick-backend.vercel.app/api/image/project?mask=${mask}`);
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

  return (
    <Layout>
      <div>
        <button
          onClick={() => navigate("/showcase")}
          className="ml-3 py-2 px-3 rounded-full bg-yellow-400 font-semibold flex text-white items-center"
        >
          <span>
            <Unicons.UilArrowLeft />
          </span>
          Go Back
        </button>
        <div className="container showcase-container mx-auto p-2 md:p-4">
          {projects.map((image, index) => (
            <div
              key={index}
              onClick={() => openImagePopup(`/${image.Mask}/${image.ID}.jpg`)}
              className="relative item bg-white overflow-hidden rounded-3xl shadow-md hover:scale-[1.07] hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              <img
                src={`https://virtual-tours-india.in/air_brick/content/${image.Mask}/${image.ID}.jpg`}
                alt="Image"
                className="object-cover rounded-3xl w-full h-full"
              />
            </div>
          ))}
        </div>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pop-backdrop">
            <div className="fixed inset-0 overflow-auto">
              <div className="flex items-center justify-center min-h-screen px-4">
                <div className="relative w-full max-w-5xl mx-auto rounded-lg shadow bg-white">
                  {/* Modal header */}
                  <div className="flex items-start justify-between rounded-t">
                    <button
                      onClick={closeImagePopup}
                      type="button"
                      className="absolute top-10 right-10 z-50 bg-[#efefef] hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                    >
                      <Unicons.UilTimes />
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="p-5">
                    <div className="flex justify-center slider-container ">
                      <Slider
                        arrows
                        infinite
                        speed={500}
                        prevArrow={<CustomPrevArrow />} // Custom previous arrow
                        nextArrow={<CustomNextArrow />}
                        initialSlide={projects.findIndex(
                          (project) => `/${project.Mask}/${project.ID}.jpg` === selectedImage,
                        )}
                      >
                        {projects.map((project, index) => (
                          <div key={index} className="slider-image-container">
                            <img
                              src={`https://virtual-tours-india.in/air_brick/content/${project.Mask}/${project.ID}.jpg`}
                              className="mx-auto slider-img"
                              alt={`Project ${index}`}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Project;
