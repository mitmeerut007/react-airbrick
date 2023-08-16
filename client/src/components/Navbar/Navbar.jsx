import React, { useState } from "react";
import NavLinks from "./NavLinks";
import * as Unicons from "@iconscout/react-unicons";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="container mx-auto">
      <div className="flex items-center font-medium justify-center bg-white md:rounded-lg md:shadow:sm">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between md:hidden">
          <h2 className="text-xl font-bold">MenuBar</h2>
          <div className="text-3xl px-2 bg-primary-200 rounded-md" onClick={() => setOpen(!open)}>
            <Unicons.UilListUiAlt color="gray" name={`${open ? "close" : "menu"}`} />
          </div>
        </div>
        <ul className="md:grid md:grid-cols-3 lg:grid-cols-5 bg-gray-100 p-3 mt-5 rounded-md hidden items-center gap-2">
          <NavLinks />
        </ul>
        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-white z-50 fixed w-2/3 top-0 overflow-y-auto bottom-0 py-28 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <h2 className="text-xl font-bold">MenuBar</h2>
          <NavLinks />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
