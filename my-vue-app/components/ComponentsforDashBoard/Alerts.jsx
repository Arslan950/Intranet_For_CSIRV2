import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';


const Alerts = ({ token, role, username, Classes }) => {
  const [pdfalert, setalert] = useState(null);
  const [allalerts, setallalerts] = useState([]);

  const fetch_alerts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/alerts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setallalerts(res.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast("❌ Failed to fetch alerts");
    }
  };

  useEffect(() => {
    fetch_alerts();
  }, []);

  const handleUpload = async () => {
    if (!pdfalert) return toast("⚠️ No file selected");

    const formData = new FormData();
    formData.append("file", pdfalert);

    try {
      await axios.post("http://localhost:3001/alerts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setalert(null);
      toast("✅ Alert uploaded");
      fetch_alerts();
    } catch (err) {
      console.error("Upload error:", err);
      toast("❌ Upload failed");
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`http://localhost:3001/alerts/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast("✅ Alert deleted");
      fetch_alerts();
    } catch (err) {
      console.error("Delete error:", err);
      toast("❌ Delete failed");
    }
  };

  const handlePrev = async (filename) => {
    try {
      const res = await axios.get(`http://localhost:3001/alerts/${filename}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      window.open(url, "_blank");
    } catch (err) {
      console.error("Preview error:", err);
      toast("❌ Preview failed");
    }
  };
const hideSections = location.pathname === "/";

  return (
    <div className={`${Classes ?? "m-4"}`}>
      <div className="space-y-4">
        <h2
  className="text-xl text-red-500 font-extrabold mb-2"
  style={{ textShadow: "1px 1px 2px white" }}
>
  📢 Announcements
</h2>


        {allalerts.length === 0 && (
          <p className="text-gray-400">No alerts available.</p>
        )}

        {allalerts.map((data) => (
          <div
            key={data._id}
            className="bg-white rounded-md p-3 flex flex-col shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-700">{data.filename}</span>
              {role === "admin" && (
                <button
                  onClick={() => handleDelete(data.filename)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete alert"
                >
                  ❌
                </button>
              )}
            </div>
            <button
              onClick={() => handlePrev(data.filename)}
              className="text-sm text-green-600 hover:underline w-fit"
            >
              Open PDF
            </button>
          </div>
        ))}

        {role === "admin" && !hideSections && (
          <div className="mt-6">
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

export default Alerts;
