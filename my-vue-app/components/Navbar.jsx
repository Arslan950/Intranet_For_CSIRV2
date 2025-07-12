import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const navigate = useNavigate();
  const hideSections = location.pathname === "/login";

  const [yes, setyes] = useState(()=>{hideSections ==="/"? false: true});
  const handleYes = () => {
    setyes(!yes);
    props.setopen(yes);
  };
  const handleLogout = () => {
    // if stored manually
    props.setAdminName("None");
    props.setrole("user");
    props.logout(); // your custom logout hook logic
    navigate("/login");
  };

  return (
    <div className="mb-12">
      <ul className="flex fixed  justify-between z-100 text-white font-medium bg-[#0c5a6f] w-full h-12 text- p-2">
        <div className="flex items-center gap-1.5  j w-1/2">
          <img
            onClick={handleYes}
            src="/menu.png"
            alt="menu"
            className="invert h-7 cursor-pointer transform rounded-full p-1 transition ease-out duration-200 hover:bg-[#88888846] hover:scale-105 "
          />{" "}
          <Link to="/" className="flex">
            CSIR{" "}
            <span className="hidden sm:block">
              {" "}
              :Council of Scientific & Industrial Research
            </span>{" "}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to={"https://github.com/Light200312/Intranet_For_CSIRV2.git"} className=" m-4">
           <img 
  className="h-12   hover:invert-0 hover:bg-white cursor-pointer rounded-full invert transition"
  src="/GHIcon.png"
  alt="GitHub Icon"
/>

          </Link>
          <button
            className=" flex  py-1 hover:bg-white transition ease-out duration-150 active:ring-1 active:ring-blue-200 hover:text-[#0c5a6f] rounded-2xl font-bold border-2  border-white px-2 capitalize text-sm pb-[2px ] hover:bg-red-700"
            onClick={handleLogout}
          >
           <span className="hidden sm:block"> {props.role} {props.username}:</span>
          <span className=""> {props.authenticated ? "Logout" : "login"}</span> 
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
