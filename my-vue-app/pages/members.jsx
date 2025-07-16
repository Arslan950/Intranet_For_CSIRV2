import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { uri } from "../components/URL";
import { useAuth } from "../src/hooks/useAuth";

const Members = (props) => {
  const [members, setMembers] = useState([]);
  const auth = useAuth();
  const setLoading = auth.loadingSet;

  console.log("Logged in as:", props.username, props.role);

  const handleMemberFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${uri}/members`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setMembers(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch members:", error.message);
      toast("Failed to fetch members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMemberFetch();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${uri}/members/${id}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      toast(`User with id: ${id} deleted successfully`);
      handleMemberFetch();
    } catch (error) {
      console.error("❌ Error:", error);
      toast("❌ Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (username, newRole) => {
    try {
      const response = await axios.put(
        `${uri}/user/${username}/roleChange`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      toast.success(response.data.message);
      console.log("Updated role:", response.data.role);
      handleMemberFetch();
    } catch (error) {
      console.error("Role change failed:", error);
      const msg =
        error?.response?.data?.message || "Failed to change user role";
      toast.error(msg);
    }
  };

  return (
    <div
      className={` ${
        props.Classes
          ? props.Classes`flex flex-col`
          : `bg-[#22313f] p-6  flex  flex-col  overflow-y-scroll max-h-screen  hide-scrollbar gap-y-3 text-white h-screen`
      } `}
    >
      <h2 className="text-3xl font-bold mb-4">Member List</h2>
      {members.map((mem) => (
        <div
          key={mem._id}
          className="group flex items-center justify-between rounded-2xl bg-white p-3 text-blue-900 hover:bg-[#e3e3e3] transition-all duration-200 shadow-gray-200  border-b-1 border-gray-400 hover:scale-102 shadow-sm "
        >
          <div className="flex gap-2">
            <img
              className="h-12 rounded-lg items-center justify-center"
              src={
                mem.profileImage
                  ? `data:${mem.profileImage.contentType};base64,${mem.profileImage.data}`
                  : "/profilepic.png"
              }
              alt="profile"
            />
            <div>
              <div className="flex gap-2 items-center">
                <div className="font-bold capitalize">{mem.username}</div>

                {mem.role === "user" && (
                  <button
                    className="text-[10px] font-bold bg-red-500 rounded-sm text-white px-2 hover:bg-red-600"
                    onClick={() => handleChangeRole(mem.username, "admin")}
                  >
                    Promote to admin
                  </button>
                )}
              </div>
              <div className="text-xs">{mem.email || "email not set"}</div>
            </div>
          </div>

          <div className="group-hover:hidden">{mem.role}</div>

          {/* 🛡️ Delete Button Logic */}
         {(
  (props.role === "superAdmin" && mem.role !== "superAdmin" && mem.username !== props.username) ||
  (props.role === "admin" && mem.role === "user")
) && (
  <div
    className="hidden group-hover:block text-red-500 cursor-pointer font-bold px-2"
    onClick={() => handleDelete(mem._id)}
    title="Delete user"
  >
    ❌
  </div>
)}

        </div>
      ))}
    </div>
  );
};

export default Members;
