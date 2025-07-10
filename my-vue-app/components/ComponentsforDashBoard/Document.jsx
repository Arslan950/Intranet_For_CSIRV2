import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Document = ({ token, role, username, Classes }) => {
  const [filter, setFilter] = useState("");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [filteredFiles, setFilteredFiles] = useState(null);


  const handleDownload = async (filename) => {
    try {
      const res = await axios.get(`http://localhost:3001/file/${filename}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      toast("doc downloaded");
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast("❌ Download failed");
      console.error(err);
    }
  };

  const handlePrev = async (filename) => {
    try {
      const res = await axios.get(`http://localhost:3001/file/${filename}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      toast("❌ Preview failed");
      console.error(err);
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:3001/files", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    }
  };
  const handlefilter = () => {
  if (filter.trim()) {
    const filtered = files.filter(file =>
      file.filename.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredFiles(filtered);
    toast("🔍 Filter applied");
  } else {
    toast("❗ Filter is empty!");
    setFilteredFiles([]); // show all
  }
};


  // useEffect(() => {
  //   fetchFiles();
  // }, []);
  useEffect(() => {
    let isFetched = false;

    if (!isFetched) {
      fetchFiles();
      isFetched = true;
    }

    // Optional cleanup
    return () => {
      isFetched = true;
    };
  }, []);

  const handleUpload = async () => {
    if (!file) return toa("No file selected");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3001/file", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast("✅ Upload successful");
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.log("❌ Upload failed");
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`http://localhost:3001/file/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast("✅ Deleted");
      fetchFiles();
    } catch (err) {
      console.log("❌ Delete failed");
    }
  };
  const hideSections = location.pathname === "/";

  return (
    <div className={`${Classes ? Classes : `bg-[#212b34] h-screen`} border  bg-amber-50 shadow-md`}>
   

      {/* Files List */}
      <div className="flex flex-col gap-y-2  ">
         <div className=" py-2 text-center border-b border-gray-400 bg-amber-300">
         <h2 className="text-lg font-bold text-[#f05757]">Downloads</h2>
      </div>
       <div className=" h-12 flex items-center  -8 mx-2 justify-center px-2 gap-4 ">
        {" "}
        <input
           
           onChange={(e)=>setFilter(e.target.value)}
          type="text w-full"
          className=" rounded-md bg-white pl-2 text-[#212b34] border border-gray-400 mth-8 py-1 w-[80%] "
          placeholder=" Enter key words for Doc"
        />{" "}
        <button onClick={handlefilter} className="bg-blue-600 px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border focus:border-white text-white">
          Search
        </button>
      </div>
        <ul className="divide-y  divide-gray-400">
        {!files && <li>Nothing to ahow</li>}  
          {(filteredFiles? filteredFiles:files)?.map((f, i) => (
            <li
              key={f._id}
              className="flex justify-between   items-center py-3 hover:bg-amber-100 px-2 rounded flex-wrap"
            >
              <span
                className="text-black text-sm cursor-pointer hover:underline"
                onClick={() => handlePrev(f.filename)}
                role="button"
              >
                {i + 1}. {(f.filename).split('.')[0]}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDownload(f.filename)}
                  className="text-blue-700 border border-blue-700 px-2 py-0.5 hover:bg-blue-100 text-xs"
                >
                  Download
                </button>
                {role === "admin" && (
                  <button
                    onClick={() => handleDelete(f.filename)}
                    className="text-red-700 border border-red-700 px-2 py-0.5 hover:bg-red-100 text-xs"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* File Upload for Admin */}
      {role === "admin" && !hideSections && (
        <div className=" mt-3.5 flex flex-col items-center gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-white max-w-[80%]  bg-gray-700 border border-gray-500 rounded  px-2 py-1"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      )}
        
      {/* <div className="w-full bg-gray-400 h-1 my-2"></div> */}
    </div>
  );
};

export default Document;



/*import React, { useState } from 'react';

const Downloads = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const documents = [
    {
      name: 'Standard Process Sheets',
      isNew: true,
    },
    {
      name: "Bird's Eye View of CMERI Campus",
      isNew: false,
    },
    {
      name: 'Network Configuration Manual (LAN)',
      isNew: false,
    },
    // Add more documents as needed
  ];

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto border border-gray-300 mt-6 shadow-md">
      {/* Header */
//       <div className="bg-meri py-2 text-center border-b border-gray-400 bg-amber-300">
//         <h2 className="text-lg font-bold text-[#f05757]">Downloads</h2>
//       </div>

//       <div className="bg-amber-50">
//         {/* Search Bar */}
//         <div className="px-4 py-3 border-b border-gray-200">
//           <div className="flex">
//             <input
//               type="text"
//               placeholder="Search documents..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 px-3 py-2 border border-gray-400 text-sm focus:outline-none"
//             />
//             <button
//               onClick={() => {}}
//               className="ml-2 px-4 py-2 bg-meri text-black font-semibold border border-yellow-600 hover:bg-yellow-300 text-sm"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Document List */}
//         <ul className="divide-y divide-gray-200 text-sm text-black">
//           {filteredDocs.length > 0 ? (
//             filteredDocs.map((doc, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center px-4 py-2"
//               >
//                 <span>
//                   {doc.name}
//                   {doc.isNew && (
//                     <span className="ml-1 text-xs text-white bg-red-600 font-bold px-1 py-0.5 rounded-sm">
//                       new
//                     </span>
//                   )}
//                 </span>
//                 <div className="flex space-x-2">
//                   <button className="text-blue-700 border border-blue-700 px-2 py-0.5 hover:bg-blue-100 text-xs">
//                     Download
//                   </button>
//                   <button className="text-red-700 border border-red-700 px-2 py-0.5 hover:bg-red-100 text-xs">
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <li className="px-4 py-2 text-gray-500">No documents found.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Downloads; */
