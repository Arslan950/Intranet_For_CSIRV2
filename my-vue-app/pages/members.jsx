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

  return (
    <div
      className={` ${
        props.Classes
          ? props.Classes
          : `bg-[#22313f] p-6  flex  flex-col gap-y-3 text-white h-screen`
      } `}
    >
      <h2 className="text-3xl font-bold mb-4">Member List</h2>
      {members.map((mem) => (
        <div
          key={mem._id}
          className="group flex items-center justify-between rounded-2xl bg-white p-3 text-blue-900 hover:bg-[#e3e3e3] transition-all duration-200"
        >
          <div className="flex gap-2">
            {/* {console.log(mem.profileImage)} */}
            <img
            // onLoad={console.log(mem.profileImage)}
              className="h-6 rounded-full items-center justify-center"
              src={
                  mem.profileImage
                    ? mem.profileImage.data
                    : "/profilepic.png"
                }
              alt="profile"
            />
            <div>{mem.username}</div>
          </div>
          <div className=" group-hover:hidden">{mem.role}</div>
          {/*mem.username !== props.username &&
            mem.role !== "Admin") &&*/}
          {props.username !== mem.username &&
            mem.role !== "admin" &&
            props.role !== "user" && (
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
