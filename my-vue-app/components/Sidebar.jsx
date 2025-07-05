import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
const SidebarLayout = ({ children, open, setopen }) => {
//   const [open, setOpen] = useState(true);

  const toggleSidebar = () => setopen(!open);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#1f2937] text-white transition-all ease-in-out duration-300 ${
          open ? "w-64" : "w-16"
        } overflow-hidden flex flex-col`}
      >
        {/* Header with toggle button always visible */}
        {/* <button onClick={toggleSidebar}>{open? "Dashboard":"x"}</button> */}
        {/* Navigation Items */}
        <nav className="flex-1 mt-4 space-y-2 ">
          <div className=" flex justify-start items-center py-2 px-3 hover:bg-gray-700 cursor-pointer">
            📁 <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} > {open && "Documents"}</span>
          </div>
          <div className="px-3 flex justify-start items-center py-2 hover:bg-gray-700 cursor-pointer">
            📌           <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} > {open && "Notices"}</span>

          </div>
          <div className="px-3 flex justify-start items-center py-2 hover:bg-gray-700 cursor-pointer">
            👥 <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} >{open && "Members"}</span>
          </div>
          <Link to={"/profile"} className="px-3 flex justify-start items-center py-2 hover:bg-gray-700 cursor-pointer">
            <img src="../src/assets/profile.png" alt="" /> <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} > {open && "Profile"}</span>
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="">{children}</main>
    </div>
  );
};

export default SidebarLayout;
