import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./Mylinks";
import * as Unicons from "@iconscout/react-unicons";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  return (
    <>
      {links.map((link, index) => (
        <div key={index}>
          <div className="px-3 text-left md:cursor-pointer group relative bg-teal-600 text-white rounded-md">
            <h1
              className="py-2 flex justify-between items-center md:pr-0 pr-5 group"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
              }}
            >
              {link.name}
              <span className="text-xl md:hidden inline">
                {heading === link.name ? <Unicons.UilAngleUp /> : <Unicons.UilAngleDown />}
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180">
                <Unicons.UilAngleDown />
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute top-5 left-3 z-50 hidden group-hover:md:block hover:md:block w-[250px]">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 left-3 -z-10 absolute 
                    mt-1 bg-white rotate-45"
                    ></div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-lg max-h-[400px] overflow-y-scroll">
                    {link.sublink.map((mysublinks, index) => (
                      <Link key={index} to={mysublinks.link}>
                        <li className="text-sm text-gray-600 p-2 rounded hover:bg-gray-100 hover:text-teal-600">
                          {mysublinks.name}
                        </li>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublink.map((slinks, index) => (
              <div>
                <li key={index} className="py-3 pl-5">
                  <Link to={slinks.link}>{slinks.name}</Link>
                </li>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
