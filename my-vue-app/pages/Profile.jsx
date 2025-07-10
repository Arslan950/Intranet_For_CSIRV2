import axios from "axios";
import { uri } from "../components/URL";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Profile = (props) => {
  const [Biodata, setBiodata] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const handleFetchProfile = async () => {
    try {
      const res = await axios.get(
        `${uri}/user/${props.AdminName}/profile`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      if (!res.data) return console.log("Profile fetch failed");
      setBiodata(res.data);
      console.log("Profile fetch successful");
    } catch (error) {
      console.log("profile Fetch failed " + error);
    }
  };
  useEffect(() => {
    handleFetchProfile();
  }, []);

  return (
    <div>
      <div className="relative">
        {/* Background Banner */}
        <img
          className="w-full h-[150px] sm:h-[200px] object-cover"
          src="https://imgs.search.brave.com/khrUkYIeD_TAu7ZwcFB2i9vU9XE064EJ3qLStLsN6kc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzY3LzQwLzIx/LzM2MF9GXzI2NzQw/MjEwOV9qWnZzcVJR/VXZTeG9oQU9tY1V0/NTQ5amxhcHFvUkhN/MC5qcGc"
          alt="bg-profile-pic"
        />

        {/* Profile Picture */}
        <div className=" absolute left-1/2 bottom-[-6rem] sm:bottom-[-6rem] lg:bottom-[-8rem] transform -translate-x-1/2 flex flex-col justify-center items-center">
          <img
            src={Biodata?.profileImage || `../src/assets/profilepic.png`}
            alt="profile"
            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white
   "
          />
          <div className="  text-center text-lg font-medium flex flex-col">
            {" "}
            <span className="capitalize sm:text-xl md:text-2xl  text-gray-700 ">
              {" "}
              {Biodata?.username}
            </span>{" "}
            <span className="text-sm text-gray-500">
              {Biodata?.email || "Email Unavailable"}
            </span>
          </div>
        </div>
      </div>
      {/* role  */}
      <div className="flex justify-between m-4">
        <Link
          className="bg-[#1c2539] text-white px-2 py-1 rounded-lg m-4 "
          to={"/profileForm"}
        >
          Edit Profile
        </Link>
        <div className="Current_role capitalize space-y-1 ">
          <span className="flex   items-center justify-center gap-2 text-sm font-bold text-gray-600">
            <span>Current role </span>{" "}
            <img
              className=" h-5 mb-1 filter grayscale-25"
              src="../public/bagicon.png"
              alt=""
            />{" "}
          </span>
          <span className="bg-gray-400 rounded-full text-white px-2 py-[1px]">
            {Biodata?.role || "role not set"}
          </span>
        </div>
      </div>
      {/* position nad skill */}
      <div className="flex justify-between mt-30 sm:mt-33 md:mt-38 lg:mt-35 m-6 ">
        <div className="psition_and_address ">
          <div className="text-2xl lg:text-3xl xl:text-4xl font-bold capitalize text-gray-600">
            {Biodata?.position || "position not set"}
          </div>
          <div className="text-sm md:text-lg lg:text-xl text-gray-500 font-medium">
            {Biodata?.address || "address not set"}
          </div>
        </div>
        <div className="skills capitalize max-w-1/2 space-y-3">
          <span className="flex font-bold text-[#737373] text-xl md:text-2xl xl:text-4xl  lg:text-3xl items-center justify-end gap-1">
            Skils{" "}
            <img className="h-6 mt-1 " src="../public/gstar.png" alt="" />
          </span>
          <span className="text-sm md:text-md  lg:text-xl xl:text-2xl flex flex-wrap gap-1 ">
            {" "}
            {Biodata?.skills ? (
              Biodata.skills[0]?.split(",").map((data, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-500 text-white  rounded-2xl px-2 lg:px-3 font-bold py-1"
                  >
                    {data.trim()}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">Skills not set</p>
            )}
          </span>
        </div>
      </div>
      {/* <Link
        className="bg-[#1c2539] text-white px-2 py-1 rounded-lg m-4 "
        to={"/profileForm"}
      >
        Edit Profile
      </Link> */}

      <div className="about m-6">
  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold capitalize text-gray-700 mb-4 text-center">
    About User
  </h2>

  <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-6 shadow-xl">
    {Biodata?.about ? (
      <p className="text-white text-lg sm:text-xl leading-relaxed tracking-wide">
        {Biodata.about}
      </p>
    ) : (
      <p className="text-white text-lg italic opacity-80">
        Nothing to show...
      </p>
    )}
  </div>
</div>

    </div>
    //     <div>
    //       <ul>
    //         {!Biodata && <div>loading..</div>}
    //        {Biodata && (
    //          <li key={Biodata._id}>
    //           <div>{Biodata.username}</div>
    //           <div>{Biodata.email}</div>
    //           <div>{Biodata.position}</div>
    //           <div>{Biodata.phone}</div>
    //           <div>{Biodata.address}</div>
    //           <div>{Biodata.skills}</div>
    //           <img src={Biodata.profileImage} alt="" />
    //         </li>

    //        )}
    //       </ul>
    // <button onClick={handleFetchProfile}>Fetch</button>
    //       <Link to={"/profileForm"}> Form</Link>

    //     </div>
  );
};

export default Profile;
