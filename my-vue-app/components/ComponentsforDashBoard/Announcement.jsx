import React, { useEffect, useState } from "react";
import axios from "axios";
import {  toast } from "react-toastify";
import { uri } from "../URL";
const Announcement = ({ token, role, username ,Classes}) => {
const hideSections = location.pathname === "/";
//!noticec===announcements
  const [ notices, setnotices] = useState([]);
  const [ntext, setntext] = useState({
    notice: "",
    title: "",
    adminName: username || "Admin1",
  });

  const handlechange = (e) => {
    setntext({ ...ntext, [e.target.name]: e.target.value });
  };

  const handlePost = async () => {
    if (ntext.notice === "" || ntext.title === ""){ toast("Notice or Title can't be empty!"); return}
    try {
      await axios.post(`${uri}/notice`, ntext, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     toast.success("✅ Upload successful", {
  toastId: "upload-success",
});
      setntext({ notice: "", title: "", adminName: username || "Admin1" });
      fetchNotices();
    } catch (err) {
      toast("❌ Upload failed: " + err.message);
    }
  };

  const fetchNotices = async () => {
    try {
      const res = await axios.get(`${uri}/notice`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.length > 0) {
        setnotices(res.data);

      } else {

        setnotices([]);
        toast("Notice cpllection is empty")
        return 
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast("❌Notice Fetch failed: " + err.message);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  async function handleDelete(id){
     try{
       
      const res= await axios.delete(`${uri}/notice/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchNotices();
      console.log("Response from notice delete: "+res.data.message)
      toast("Response from notice delete: "+res.data.message)

     }catch(err){
       console.log("Error when deleting Notice :"+err)
       toast("Error when deleting Notice :"+err)
   
     }
  }

  return (
    <div className={`  ${Classes ? Classes: ` text-white bg-[#34495e] h-screen `}    bg-[#fffbeb]  shadow-md `}>
      <h1 className="text-3xl bg-amber-300 py-2 text-[#f05757] font-bold mb-6 text-center">Announcements</h1>

      <div className="grid gap-4 mb-4  ">
      {!notices && <p>Noting to show</p>}  
        {notices?.map((data, index) => (
          <div
            key={index}
            className="border   px-4 rounded-lg "
          >
            <div className="flex justify-between w-full">
              {" "}
              <h3 className="text-lg font-semibold text-green-500 ">
               <span className="underline">{data.title}</span> <span className="ml-1 text-xs  text-white bg-red-600 font-bold px-1 py-0.5 rounded-sm">
                      new
                    </span>
              </h3>{" "}
             {  role==="admin" && <button 
               className="bg-red-600 max-h-8 m-2 rounded-md "  onClick={()=>handleDelete(data._id)}>
                <svg
                

                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>}
            </div>
            <p className="mt-2 text-black font-semibold">{data.notice}</p>
            <div className="mt-5 text-sm text-gray-400 flex justify-between">
              <span>👤 {data.adminName}</span>
              <span>🕒 {new Date(data.uploadTime).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>


      {role === "admin" && !hideSections && (
        <div className="bg-gray-800 p-6 rounded-lg  shadow-lg max-w-xl  mx-4 sm:mx-auto">
          <h2 className="text-2xl font-bold mb-4">Post New Notice</h2>
          <input
            value={ntext.title}
            name="title"
            onChange={handlechange}
            type="text"
            placeholder="Enter title..."
            className="w-full mb-4 p-2 rounded bg-white text-black focus:outline-none"
          />
          <textarea
            value={ntext.notice}
            name="notice"
            onChange={handlechange}
            placeholder="Enter notice..."
            rows={4}
            className="w-full mb-4 p-2 rounded bg-white text-black focus:outline-none"
          />
          <div className="flex justify-between">
            <button
              onClick={handlePost}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              onClick={fetchNotices}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;
