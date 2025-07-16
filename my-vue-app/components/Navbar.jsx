import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideSections = location.pathname === "/login";
  const [yes, setyes] = useState(() => (hideSections === "/" ? false : true));
  const myDate = new Date();

  const handleYes = () => {
    setyes(!yes);
    props.setopen(yes);
  };

  const handleLogout = () => {
    props.setAdminName("None");
    props.setrole("user");
    props.logout();
    navigate("/login");
  };

  return (
    <>
    <div className="sm:mb-21 mb-10">
      <div className="fixed w-full z-100">

    
      {/* Top Header */}
      <header className="bg-cyan-700 text-[12px] text-white w-full sm:flex hidden   sm:justify-between max-h-6">
        <span className="sm:flex sm:gap-1.5 sm:justify-start sm:items-center sm:text-l hidden px-4 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3">
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
          </svg>
          <p>{myDate.toDateString()}</p>
        </span>

        <span className=" md:w-[25%]  sm:w-[35%] sm:justify-around sm:items-center sm:text-l sm:mr-3.5 flex justify-around items-center  ">
          <Link to="/" className="hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
            <p>Home</p>
          </Link>

          <a href="https://www.cmeri.res.in/" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
            <p>CSIR-CMERI</p>
          </a>

          <a onClick={handleLogout} className="hover:underline flex items-center gap-1 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="24px" fill="#ffffffff">
              <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840v80q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200v80Zm160-160-56-57 103-103H360v-80h327L584-624l56-56 200 200-200 200Z" />
            </svg>
            <p>{props.authenticated ? "Logout" : "Login"}</p>
          </a>
        </span>
      </header>

      {/* Sub Navbar */}
      <nav className="bg-cyan-800 text-white  w-full sm:h-16 h-10 flex justify-start items-center px-2">
        <img
          onClick={handleYes}
          src="/menu.png"
          alt="menu"
          className="invert  h-6 w-8 cursor-pointer transform rounded-full p-1 transition ease-out duration-200 hover:bg-[#88888846] hover:scale-105"
        />
<Link to={'/'}>
        <img
          src="https://dyncdn.exampathfinder.net/epf_n_attachments/organisation/0FdDdIMg/logo.png"
          alt="Logo"
          className="sm:h-12  h-8 object-cover pt-[1px] ml-4 mr-2 bg-white rounded-full"
        /></Link>

        <Link to="/" className="h-16 w-full sm:flex sm:flex-col sm:justify-center sm:items-center flex flex-col justify-center sm:ml-0 ml-3.5 font-serif">
          <div className="sm:text-xl sm:font-bold text-lg font-bold">CSIR-CMERI</div>
          <div className="sm:text-lg text-xs hidden sm:block  ">Center of Excellence and Farm Machinery, Ludhiana</div>
        </Link> 

           <a onClick={handleLogout} className="hover:underline sm:hidden flex items-center gap-1 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffffff">
              <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840v80q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200v80Zm160-160-56-57 103-103H360v-80h327L584-624l56-56 200 200-200 200Z" />
            </svg>
            {/* <p>{props.authenticated ? "Logout" : "Login"}</p> */}
          </a>
      </nav>
        </div>
    </div>
    </>
  );
};

export default Navbar;
