import React, { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../URL";
import { toast } from "react-toastify";
import { useAuth } from "../../src/hooks/useAuth";
const Document = ({ token, role, username, Classes }) => {
  const [filter, setFilter] = useState("");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [filteredFiles, setFilteredFiles] = useState(null);
  const auth = useAuth();
  const setLoading = auth.loadingSet;

  const handleDownload = async (filename) => {
    setLoading(true);
    try {
      const res = await axios.get(`${uri}/file/${filename}`, {
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
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = async (filename) => {
    try {
      const res = await axios.get(`${uri}/file/${filename}`, {
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
    setLoading(true);
    try {
      const res = await axios.get(`${uri}/files`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    } finally {
      setLoading(false);
    }
  };
  const handlefilter = () => {
    if (filter.trim()) {
      const filtered = files.filter((file) =>
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
    setLoading(true);
    if (!file) return toa("No file selected");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${uri}/file`, formData, {
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    setLoading(true);
    try {
      await axios.delete(`${uri}/file/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast("✅ Deleted");
      fetchFiles();
    } catch (err) {
      console.log("❌ Delete failed");
    } finally {
      setLoading(false);
    }
  };
  const hideSections = location.pathname === "/";

  return (
    <div
      className={`${
        Classes ? Classes : `bg-[#212b34] h-screen`
      } border bg-box-col shadow-md`}
    >
      {/* Files List */}
      <div className="flex flex-col gap-y-2  ">
        <div className=" py-2 text-center  border-b border-gray-400 bg-heading">
          <h2 className="text-lg font-bold  text-Color">Downloads</h2>
        </div>
        <div className=" h-12 flex items-center   mx-2 justify-center px-2 gap-4 ">
          {" "}
          <input
            onChange={(e) => setFilter(e.target.value)}
            type="text w-full"
            className=" rounded-md bg-white pl-2 text-[#212b34] border border-gray-400 mth-8 py-1 w-[80%] "
            placeholder=" Enter key words for Doc"
          />{" "}
          <button
            onClick={handlefilter}
            className="bg-blue-600 px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border focus:border-white text-white"
          >
            Search
          </button>
        </div>

        <div className={`overflow-y-scroll hide-scrollbar ${hideSections? `max-h-[250px]`:``}  px-2>`}>
  <ul className="divide-y divide-gray-400">
    {(filteredFiles ? filteredFiles : files)?.map((f, i) => (
      <li
        key={f._id}
        className="flex justify-between items-center py-3 bg-hover-col px-2 rounded flex-wrap"
      >
        <span
          className="text-black text-sm cursor-pointer hover:underline"
          onClick={() => handlePrev(f.filename)}
          role="button"
        >
          {i + 1}. {f.filename.split(".")[0]}
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

      </div>
      {/* File Upload for Admin */}
      {(role === "admin" || role === "superAdmin") && !hideSections && (
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
