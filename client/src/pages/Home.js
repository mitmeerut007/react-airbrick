import React from "react";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./../components/Navbar/Navbar";

const Home = () => {
  return (
    <Layout>
      <ToastContainer />
      <Navbar />
      <div className="container mx-auto p-3 md:p-10">
        {/* Section 1 card */}
        <div className="lg:mx-20">
          <h1 className="text-3xl text-center font-semibold mb-5">Explore the best of Workspace Photos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/F/5431.jpg"
                alt="Image 1"
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-start p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-4xl mb-4 font-bold">Open Office</h2>
                  <button className="py-2 px-4 font-bold text-sm rounded-3xl text-black bg-white">View More</button>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/S/8683.jpg"
                alt="Image 1"
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-start p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-4xl mb-4 font-bold">Private Office</h2>
                  <button className="py-2 px-4 font-bold text-sm rounded-3xl text-black bg-white">View More</button>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/E/1601.jpg"
                alt="Image 1"
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-start p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-4xl mb-4 font-bold">Work Lounge</h2>
                  <button className="py-2 px-4 font-bold text-sm rounded-3xl text-black bg-white">View More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Section 2 card */}
        <div className="mt-20 lg:mx-20">
          <h1 className="text-xl text-center font-semibold mb-5">Explore the best of Air Brick</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/E/1599.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/B/8101.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/M/8049.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {/* Card 1 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/B/8095.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/AB/7573.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/AH/1953.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Section 3 card */}
        <div className="mt-20 lg:mx-20">
          <h1 className="text-xl text-center font-semibold mb-5">Explore the best of Air Brick</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/AA/6807.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/BK/6732.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/BJ/5831.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {/* Card 1 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/P/5346.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/U/8009.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
              <img
                src="https://virtual-tours-india.in/air_brick/content/D/4678.jpg"
                alt="Image 1"
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                <div className="text-left">
                  <h2 className="text-lg font-bold">Open Office</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
