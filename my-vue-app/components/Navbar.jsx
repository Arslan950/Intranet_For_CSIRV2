import React,{useState} from "react";

import { Link } from "react-router-dom";
const Navbar = (props) => {
  const [yes, setyes] = useState(true)
  const handleYes=()=>{
    setyes(!yes)
    props.setopen(yes)

  }
  return (
    <div className="">
    <ul className="flex justify-between text-white font-medium bg-[#22313f] w-full h-12 text- p-2">
      <div className="flex items-center gap-1.5  j w-1/2">
       
        < img onClick={handleYes}
          src="../src/assets/menu.png"
          alt="menu"
          className="invert h-7 cursor-pointer transform rounded-full p-1 transition ease-out duration-200 hover:bg-[#88888846] hover:scale-105 "
        />{" "}
        <Link to="/" className="flex">CSIR <span className="hidden sm:block"> :Council of Scientific & Industrial Research</span> </Link>
      </div>
      <button
        className="bg-red-600 rounded-2xl px-2 capitalize text-sm pb-[2px ] hover:bg-red-700"
        onClick={props.logout}
      >
        {props.role} {props.username}:{" "}
        {props.authenticated ? "Logout" : "login"}
      </button>
    </ul>
    
    </div>
  );
};

export default Navbar;
