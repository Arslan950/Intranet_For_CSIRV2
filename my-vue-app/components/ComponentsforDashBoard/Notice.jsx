import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { uri } from "../URL";
import { useAuth } from "../../src/hooks/useAuth";
//! alerts===Notices

const NoticeBoard = ({ token, role, username, Classes, heading }) => {
  const [pdfalert, setalert] = useState(null);
  const [allalerts, setallalerts] = useState([]);
  const auth=useAuth()
 const setLoading=auth.loadingSet
  const fetch_alerts = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${uri}/alerts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setallalerts(res.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast("❌ Failed to fetch alerts");
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetch_alerts();
  }, []);

  const handleUpload = async () => {
    if (!pdfalert) return toast("⚠️ No file selected");
setLoading(true)
    const formData = new FormData();
    formData.append("file", pdfalert);
 
    try {
      await axios.post(`${uri}/alerts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setalert(null);
      toast("✅ Alert uploaded");
      fetch_alerts();
    } catch (err) {
      console.error("Upload error:", err);
      toast("❌ Upload failed");
    }finally{
      setLoading(false)
    }
  };

  const handleDelete = async (filename) => {
    setLoading(true)
    try {
      await axios.delete(`${uri}/alerts/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast("✅ Alert deleted");
      fetch_alerts();
    } catch (err) {
      console.error("Delete error:", err);
      toast("❌ Delete failed");
    }finally{
      setLoading(false)
    }
  };

  const handlePrev = async (filename) => {
     setLoading(true)
    try {
      const res = await axios.get(`${uri}/alerts/${filename}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );
      window.open(url, "_blank");
    } catch (err) {
      console.error("Preview error:", err);
      toast("❌ Preview failed");
    }finally{
      setLoading(false)
    }
  };
  const hideSections = location.pathname === "/";

  return (
    <div
      className={`${
        Classes ?? "h-screen "
      } border border-gray-200 shadow-md  bg-box-col `}
    >
      <div className="space-y-4">
        <div className="bg-heading py-2 text-center border-b border-gray-400">
          <h2 className="text-lg font-bold text-Color ">Notice</h2>
        </div>

        {allalerts.length === 0 && (
          <p className="text-gray-400">No alerts available.</p>
        )}

        {allalerts.map((data, index) => (
          <div key={data._id} className=" md:py-2   px-3 flex flex-col ">
            <div
              className={`${
                !hideSections ? `flex  justify-between items-center ` : ``
              }  mb-1`}
            >
              <div className="flex  items-center">
                {" "}
                <div
                  onClick={() => handlePrev(data.filename)}
                  className="font-medium text-blue-700 cursor-pointer"
                >
                  {(data.filename).split(".")[0]}
                </div>{" "}
                <span className="underline">{data.title}</span>
                {index === 0 && (
                  <span className="ml-1 text-xs  text-white bg-red-600 font-bold px-1 max-h-6 py-0.5 rounded-sm">
                    new
                  </span>
                )}
              </div>
              {role === "admin" && !hideSections && (
                <button
                  onClick={() => handleDelete(data.filename)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete alert"
                >
                  ❌
                </button>
              )}
            </div>
            {/* <button
              onClick={() => handlePrev(data.filename)}
              className="text-sm text-green-600 hover:underline w-fit"
            >
              Open PDF
            </button> */}
          </div>
        ))}

        {(role === "admin" || role==="superAdmin") && !hideSections && (
          <div className="mt-6 mx-3">
            <h2 className="text-xl">Upload New Announcement</h2>
            <div className="flex items-center justify-between mb-6">
              <input
                type="file"
                onChange={(e) => setalert(e.target.files[0])}
                className="text-sm file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-blue-600 file:text-white file:rounded cursor-pointer"
              />
              <button
                onClick={handleUpload}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded mt-3.5"
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
