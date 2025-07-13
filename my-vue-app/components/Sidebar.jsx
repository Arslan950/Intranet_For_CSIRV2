import React, { useState ,useEffect} from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
const SidebarLayout = ({  open, setopen }) => {
//   const [open, setOpen] = useState(true);

  const toggleSidebar = () => setopen(!open);
// useEffect(() => {
//   if (open) {
//     document.body.classList.add("no-scroll");
//   } else {
//     document.body.classList.remove("no-scroll");
//   }
// }, [open]);

  return (
    <div className="flex min-h-screen   ">
      {/* Sidebar */}
      <div
        className={`bg-[#0c596f] text-white z-50 transition-all ease-in-out duration-300 fixed h-screen     ${
          open ? "w-45 " : "w-0  sm:w-14 "
        } overflow-hidden flex flex-col`}
      >
        {/* Header with toggle button always visible */}
        {/* <button onClick={toggleSidebar}>{open? "Dashboard":"x"}</button> */}
        {/* Navigation Items */}

        <nav className="flex-1 space-y-2 ">
          <Link  to={"/document"} className=" flex justify-start items-center py-2 px-3 hover:bg-[#1d839f] cursor-pointer">
           <span>📁</span>  <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} > {open && "Documents"}</span>
          </Link>
          <Link to={"/notice"} className="px-3 flex justify-start items-center py-2 hover:bg-[#1d839f]  cursor-pointer">
            📌           <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} > {open && "Notices"}</span>

          </Link>
          <Link to={"/member"} className="px-3 flex justify-start items-center py-2 hover:bg-[#1d839f]  cursor-pointer">
            👥 <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} >{open && "Members"}</span>
          </Link>
           <Link to={"/alerts"} className="px-3 flex justify-start items-center py-2 hover:bg-[#1d839f]  cursor-pointer">
            🚨 <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} >{open && "Alerts"}</span>
          </Link>
          <Link to={"/profile"} className="px-3 flex justify-start items-center py-2 hover:bg-[#1d839f]  cursor-pointer">
            <img src="/profile.png" alt="" /> <span className={`transition ease-in duration-500 ${open? "block":"hidden"}`} > {open && "Profile"}</span>
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className={`w-full  sm:ml-14`}>
        <Outlet />
        </main>
    </div>
  );
};

export default SidebarLayout;
