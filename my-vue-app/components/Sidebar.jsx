import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
const SidebarLayout = ({  open, setopen }) => {
//   const [open, setOpen] = useState(true);

  const toggleSidebar = () => setopen(!open);

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div
        className={`bg-[#1a237e] text-white transition-all ease-in-out duration-300 ${
          open ? "w-60" : "w-14"
        } overflow-hidden flex flex-col`}
      >
        {/* Header with toggle button always visible */}
        {/* <button onClick={toggleSidebar}>{open? "Dashboard":"x"}</button> */}
        {/* Navigation Items */}

        <nav className="flex-1 mt-4 space-y-2 ">
          <Link  to={"/document"} className=" flex justify-start items-center py-2 px-3 hover:bg-[#3949ab] cursor-pointer">
           <span>📁</span>  <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} > {open && "Documents"}</span>
          </Link>
          <Link to={"/notice"} className="px-3 flex justify-start items-center py-2 hover:bg-[#3949ab]  cursor-pointer">
            📌           <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} > {open && "Notices"}</span>

          </Link>
          <Link to={"/member"} className="px-3 flex justify-start items-center py-2 hover:bg-[#3949ab]  cursor-pointer">
            👥 <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} >{open && "Members"}</span>
          </Link>
           <Link to={"/alerts"} className="px-3 flex justify-start items-center py-2 hover:bg-[#3949ab]  cursor-pointer">
            🚨 <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} >{open && "Alerts"}</span>
          </Link>
          <Link to={"/profile"} className="px-3 flex justify-start items-center py-2 hover:bg-[#3949ab]  cursor-pointer">
            <img src="../src/assets/profile.png" alt="" /> <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} > {open && "Profile"}</span>
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="w-full ">
        <Outlet/>
        </main>
    </div>
  );
};

export default SidebarLayout;
