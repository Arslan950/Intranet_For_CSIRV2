import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Noticeboard = ({ token, role, username ,Classes}) => {
  const [notices, setnotices] = useState([]);
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
      await axios.post("http://localhost:3001/notice", ntext, {
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
      const res = await axios.get("http://localhost:3001/notice", {
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
       
      const res= await axios.delete(`http://localhost:3001/notice/${id}`, {
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
    <div className={`p-4 md:p-8 text-white bg-[#34495e] rounded-xl min-h-fit ${Classes}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">📌 Notice Board</h1>
     <ToastContainer autoClose={3000} theme="dark" />

      <div className="grid gap-4 mb-10">
        {notices.map((data, index) => (
          <div
            key={index}
            className="bg-[#101826] border border-gray-700 p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between w-full">
              {" "}
              <h3 className="text-xl font-semibold text-blue-400">
                {data.title}
              </h3>{" "}
             {  role==="admin" && <button 
               className="bg-red-600 rounded-md "  onClick={()=>handleDelete(data._id)}>
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
            <p className="mt-2 text-gray-200">{data.notice}</p>
            <div className="mt-3 text-sm text-gray-400 flex justify-between">
              <span>👤 {data.adminName}</span>
              <span>🕒 {new Date(data.uploadTime).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {role === "admin" && (
        <div className="bg-[#101826] p-6 rounded-lg shadow-lg max-w-xl mx-auto">
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

export default Noticeboard;
