import React, { useEffect, useState } from "react";
import axios from "axios";
import Announcements from "./ComponentsforDashBoard/Announcement";
import Members from "../pages/members";
import Noticeboard from "./ComponentsforDashBoard/Notice";
import Document from "./ComponentsforDashBoard/Document";
import SidebarLayout from "./Sidebar";
import Cybertips from "./Cybertips";
import Footer from "./Footer";
import Service from "./ComponentsforDashBoard/Services";
import LoaderModal from "./LoaderModal";
import GoveLinks from "./ComponentsforDashBoard/GovLinks";
import NewWebMail from "./ComponentsforDashBoard/NewWebMale";
import { useAuth } from "../src/hooks/useAuth";
const Dashboard = ({ token, role, username, open, setopen }) => {
  const auth = useAuth();

  return (
    <div className=" bg-[#ffff]  xl:max-w-[80%] mx-auto ">
      <div className=" sm:p-6 p-1 sm:grid grid-cols-4  text-white min-h-screen grid-flow-dense grid-flow gap-4 ">
        <Document
          token={token}
          username={username}
          role={role}
          Classes={`lg:col-span-1 sm:col-span-2 col-span-4 border-gray-300 `}
        />
        <Noticeboard
          token={token}
          role={role}
          username={username}
          heading={"text-white"}
          Classes={`sm:col-span-2 md:col-span-2 lg:col-span-2 col-span-4 `}
        />
        <Service Classes={`lg:col-span-1  sm:col-span-2 col-span-4 `} />
        <Cybertips Classes={`lg:col-span-1  sm:col-span-2 col-span-4 `} />
        <Announcements
          token={token}
          username={username}
          role={role}
          Classes={`sm:col-span-2 col-span-4 min-h-fit border border-gray-300  `}
        />

        <NewWebMail
          Classes={`lg:col-span-1  sm:col-span-2 col-span-4   max-h-98 min-h-58`}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
