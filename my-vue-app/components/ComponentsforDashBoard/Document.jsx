import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Document = ({ token, role, username,Classes }) => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

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
      toast("doc downloaded")
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
    <div className={`${Classes? Classes: `bg-[#212b34] h-screen`}`}>
    
      {/* Files List */}
      <div className="flex flex-col gap-y-2 p-4" >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          📄 Download Documentations{" "}
        </h2>
        <ul className="divide-y divide-gray-600">
          {files.map((f, i) => (
            <li
              key={f._id}
              className="flex justify-between items-center py-3 hover:bg-gray-800 px-2 rounded flex-wrap"
            >
              <span
                className="text-blue-300 cursor-pointer hover:underline"
                onClick={() => handlePrev(f.filename)}
                role="button"
              >
                {i + 1}. {f.filename}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDownload(f.filename)}
                  className="text-green-400 underline hover:text-green-600"
                >
                  Download
                </button>
                {role === "admin" && (
                  <button
                    onClick={() => handleDelete(f.filename)}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
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
