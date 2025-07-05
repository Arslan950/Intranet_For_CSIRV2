import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const Members = (props) => {
  const [members, setMembers] = useState([]);
 console.log("Logged in as:", props.username, props.role);

  const handleMemberFetch = async () => {
    try {
      const res = await axios.get("http://localhost:3001/members", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setMembers(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch members:", error.message);
      toast("Failed to fetch members.");
    }
  };

  useEffect(() => {
    handleMemberFetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/members/${id}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      toast(`User with id: ${id} deleted successfully`);
      handleMemberFetch();
    } catch (error) {
      console.error("❌ Error:", error);
      toast("❌ Error deleting user");
    }
  };

  return (
    <div className={` bg-[#22313f] p-6 rounded-xl flex ${props.Classes} flex-col gap-y-3 text-white`}>
      <h2 className="text-3xl font-bold mb-4">Member List</h2>
      {members.map((mem) => (
        <div
          key={mem._id}
          className="group flex items-center justify-between rounded-2xl bg-white p-3 text-blue-900 hover:bg-[#e3e3e3] transition-all duration-200"
        >
          <div>{mem.username}</div>
          <div className=" group-hover:hidden">{mem.role}</div>
  {/*mem.username !== props.username &&
            mem.role !== "Admin") &&*/} 
          {props.username !== mem.username && mem.role !=="admin"  && props.role !=="user"&& (
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
