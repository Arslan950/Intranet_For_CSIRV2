// CyberSecurityTips.jsx

import React from 'react';

const Service = ({Classes}) => {
 

  return (
    <div className={`max-w-full ${Classes}  bg-box-col shadow-md border border-gray-300`}>
      {/* Header */}
      <div className="bg-heading py-2 text-center border-b border-gray-400">
        <h2 className="text-lg font-bold text-Color">Services</h2>
      </div>

      <div className=" p-4  flex flex-col justify-between">
        {/* Tips Section */}
        <div className="text-center mb-4">
          <ul className="list-disc list-inside text-left mt-4 text-sm text-black space-y-1">
           <li><a href="#">IT care</a></li>
           <li><a href="https://attendance.cmeri.res.in/login"> CMERI Attendance Portal</a></li>
           <li><a href="https://attendance.cmeri.res.in/login">AEBAS Attendance Portal</a> </li>
           <li><a href="https://merinet2.cmeri.res.in/temp.php?url=https://www.google.com/calendar/embed?src=csir.cmeri%40gmail.com&ctz=Asia/Calcutta"> CMERI Holiday Calender</a></li>
           <li><a href="#">Store</a></li>
           <li><a href="#"></a> Manpower Database</li>
           <li><a href="#">WebOPAC(KRC/ Library)</a> </li>
           <li><a href="#">WORKS Status</a></li>
          </ul>
        </div>
       

        {/* Pagination placeholder - as requested, not functional pages */}
        {/* <div className="flex justify-center items-center mt-4 text-sm">
          <button className="text-blue-700 hover:underline px-2 py-1 cursor-not-allowed opacity-50">
            Previous
          </button>
          <span className="bg-amber-300 text-black font-bold px-3 py-1 mx-1 border border-yellow-600">
            1
          </span>
          <span className="text-blue-700 px-3 py-1 mx-1 border border-transparent cursor-not-allowed opacity-50">
            2
          </span>
          <button className="text-blue-700 hover:underline px-2 py-1 cursor-not-allowed opacity-50">
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Service;