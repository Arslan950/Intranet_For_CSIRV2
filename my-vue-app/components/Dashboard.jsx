import React, { useEffect, useState } from "react";
import axios from "axios";
import Noticeboard from "./ComponentsforDashBoard/Noticeboard";
{/* <ToastContainer autoClose={3000} position="top-right" theme="dark" /> */}
import Members from "../pages/members";
import Alerts from "./ComponentsforDashBoard/Alerts";
import Document from "./ComponentsforDashBoard/Document";
import SidebarLayout from "./Sidebar"
import { ToastContainer, toast } from "react-toastify";

const Dashboard = ({ token, role, username ,open ,setopen})  => {
  return (
    <SidebarLayout setopen={setopen} open={open}>
       <div className=" bg-[#e4f1fe]">
      <h2 className="capitalize py-4 font-bold  text-black text-center text-3xl">{role} Panel</h2>
      <div className="p-6 grid grid-cols-4 text-white min-h-screen grid-flow-dense grid-flow gap-4 ">
      {/* <ToastContainer/> */}
      <Document token={token} username={username} role={role} Classes={`lg:col-span-1 lg:row-span-2 sm:col-span-2 col-span-4 bg-[#22313f] rounded-xl p-6`} />
      {/* Noticeboard Component */}
      <Noticeboard token={token} username={username} role={role} Classes={`sm:col-span-2 col-span-4`} />
      {/* <div className="w-full bg-gray-400 h-1 my-2"></div> */}

      <Members token={token} role={role} username={username}  Classes={` col-span-4 md:col-span-1 md:row-span-2 `}/>
      <Alerts token={token} role={role} username={username} Classes={`sm:col-span-2 md:col-span-3 lg:col-span-2 col-span-4  bg-[#34495e] px-6 py-5 rounded-lg` } />
      {/* <div className="w-full bg-gray-400 h-1 my-2"></div> */}

    </div></div>
    </SidebarLayout>
   
  );
};

export default Dashboard;
