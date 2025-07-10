import React, { useEffect, useState } from "react";
import axios from "axios";
import Announcements from "./ComponentsforDashBoard/Announcement";
import Members from "../pages/members";
import Noticeboard from "./ComponentsforDashBoard/Notice";
import Document from "./ComponentsforDashBoard/Document";
import SidebarLayout from "./Sidebar"
import Cybertips from "./Cybertips";
import Footer from "./Footer"
import Service from "./ComponentsforDashBoard/Services";
const Dashboard = ({ token, role, username ,open ,setopen})  => {
  return (
    // <SidebarLayout setopen={setopen} open={open}>
       <div className=" bg-[#ffff]">
      {/* <h2 className="capitalize py-4 font-bold  text-black text-center text-3xl">{role} Panel</h2> */}
      <div className="p-6 grid grid-cols-4 text-white min-h-screen grid-flow-dense grid-flow gap-4 ">
      {/* <ToastContainer/> */}
      <Document token={token} username={username} role={role} Classes={`lg:col-span-1 sm:col-span-2 col-span-4 border-gray-300 `} />
      {/* Noticeboard Component */}
      <Noticeboard token={token} role={role} username={username} heading={"text-white"} Classes={`sm:col-span-2 md:col-span-2 lg:col-span-2 col-span-4 ` } />
      {/* <div className="w-full bg-gray-400 h-1 my-2"></div> */}
      <Service Classes={`lg:col-span-1  sm:col-span-2 col-span-4 `}/>
      <Cybertips Classes={`lg:col-span-1  sm:col-span-2 col-span-4 `}/>
      <Announcements token={token} username={username} role={role} Classes={`sm:col-span-2 col-span-4 min-h-fit border border-gray-300  `} />

      {/* <Members token={token} role={role} username={username}  Classes={`rounded-xl col-span-4 md:col-span-2  lg:col-span-1 sm:col-span-2 md:row-span-2 bg-[#22313f] p-6  flex  flex-col gap-y-3 text-white `}/> */}
      {/* <div className="w-full bg-gray-400 h-1 my-2"></div> */}
    </div>
      <Footer />

    </div>
    // </SidebarLayout>
   
  );
};

export default Dashboard;
