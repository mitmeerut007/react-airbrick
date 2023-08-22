import React from "react";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./../components/Navbar/Navbar";
import { links } from "../components/Navbar/Mylinks";
import { Link } from "react-router-dom";
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
            <Link to="/showcase?tags=open_office">
              <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
                <img src="/F/5431.jpg" alt="Image 1" className="w-full h-[250px] object-cover" />
                <div className="absolute inset-0 flex items-end justify-start p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                  <div className="text-left">
                    <h2 className="text-4xl mb-4 font-bold">Open Office</h2>
                    <button className="py-2 px-4 font-bold text-sm rounded-3xl text-black bg-white">View More</button>
                  </div>
                </div>
              </div>
            </Link>
            {/* Card 2 */}
            <Link to="/showcase?tags=private_office">
              <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
                <img src="/S/8683.jpg" alt="Image 1" className="w-full h-[250px] object-cover" />
                <div className="absolute inset-0 flex items-end justify-start p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                  <div className="text-left">
                    <h2 className="text-4xl mb-4 font-bold">Private Office</h2>
                    <button className="py-2 px-4 font-bold text-sm rounded-3xl text-black bg-white">View More</button>
                  </div>
                </div>
              </div>
            </Link>
            {/* Card 3 */}
            <Link to="/showcase?tags=work_lounge">
              <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
                <img src="/E/1601.jpg" alt="Image 1" className="w-full h-[250px] object-cover" />
                <div className="absolute inset-0 flex items-end justify-start p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                  <div className="text-left">
                    <h2 className="text-4xl mb-4 font-bold">Work Lounge</h2>
                    <button className="py-2 px-4 font-bold text-sm rounded-3xl text-black bg-white">View More</button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {/* Section 2 card */}
        <div>
          {links
            .filter((link) => link.name === "Meeting Spaces" || link.name === "Support Spaces")
            .map((link, index) => (
              <div key={index} className="mt-20 lg:mx-20">
                <h1 className="text-xl text-center font-semibold mb-5">Explore the best of Air Brick {link.name}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {link.sublink.map((sublink, subIndex) => (
                    <Link
                      key={subIndex}
                      to={`https://air-brick-front.vercel.app/showcase?tags=${sublink.name
                        .toLowerCase()
                        .replace(/\s+/g, "_")
                        .replace(/\//g, "-")}`}
                    >
                      <div className="relative overflow-hidden bg-white rounded-lg shadow-md cursor-pointer">
                        <img src={`${sublink?.imgLink}.jpg`} alt="Image 1" className="w-full h-[120px] object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center p-10 bg-black bg-opacity-25 hover:bg-opacity-40 text-white transition-opacity opacity-100">
                          <div className="text-left">
                            <h2 className="text-lg font-bold">{sublink.name}</h2>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
