import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "./Context";
import axios from "axios";
import * as Unicons from "@iconscout/react-unicons";

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  console.log(location.pathname);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    try {
      const response = await axios.get("http://localhost:5000/api/user/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Accept: "application/json",
        },
        withCredentials: true, // Include credentials for cross-origin requests
      });

      const data = response.data;
      console.log(data);

      if (data.status === 201) {
        console.log("User logout");
        localStorage.removeItem("usersdatatoken");
        setLoginData(false);
        history("/");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 shadow">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="https://airbrickinfra.com" className="flex items-center">
              <img src="https://airbrickinfra.com/wp-content/uploads/2023/03/cropped-logo-04-1-300x100.png" className="mr-3 h-6 sm:h-9 bg-teal-600 rounded-sm" alt="Flowbite Logo" />
            </Link>
            <div className="flex items-center lg:order-2">
              <button
                onClick={() => logoutuser()}
                className="text-white flex items-center gap-2 bg-teal-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                <span><Unicons.UilSignout /></span>Logout
              </button>
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="mobile-menu-2"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`w-6 h-6 ${isMobileMenuOpen ? "hidden" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  className={`w-6 h-6 ${isMobileMenuOpen ? "" : "hidden"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${
                isMobileMenuOpen ? "" : "hidden"
              }`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-3 lg:mt-0">
                <li>
                  <Link
                    to="/home"
                    className={`block navlinks ${location.pathname === "/home" ? 'lg:bg-teal-200 bg-teal-600' : ''} hover:bg-teal-200 px-4 py-2 rounded-full text-gray-800`}
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/showcase"
                    className={`block navlinks ${location.pathname === "/showcase" ? 'lg:bg-teal-200 bg-teal-600' : ''} hover:bg-teal-200 px-4 py-2 rounded-full text-gray-800`}
                  >
                    Showcase
                  </Link>
                </li>
                <li>
                  <Link
                    to="/project?mask=A"
                    className={`block navlinks ${location.pathname === "/project" ? 'lg:bg-teal-200 bg-teal-600' : ''} hover:bg-teal-200 px-4 py-2 rounded-full text-gray-800`}
                  >
                    Project Sample
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
