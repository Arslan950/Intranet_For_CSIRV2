import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { uri } from "../components/URL";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/hooks/useAuth";

const ProfileForm = (props) => {
  const loadingSet=useAuth().loadingSet
    const navigate=useNavigate();
  const [personalInfo, setpersonalInfo] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    skills: ''
  });

  const [profilePic, setprofilePic] = useState({});
  const handleChangeForPI = (e) => {
    setpersonalInfo({...personalInfo, [e.target.name]: e.target.value });
  };
  const handleChangeForPPic = (e) => {
    setprofilePic(e.target.files[0]);
  };
  const handleSubmit =async () => {
    loadingSet(true)

      const infoToSend = {
    ...personalInfo,
    skills: personalInfo.skills?.split(",").map(skill => skill.trim()) 
       } // 👈 string ➝ array
  

    const formData=new FormData();
    Object.entries(infoToSend).forEach(([key,value])=>{
        formData.append(key,value);
    })
    if (profilePic){
        formData.append("profileImage",profilePic)
    }
   try {
    const res=await axios.put(`${uri}/user/${props.AdminName}/profile`,formData, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      if (res.data) console.log(res.data)
       if(res.data){ toast("Profile Updated Successfully!!")
        navigate("/profile")
       }

       

    
   } catch (error) {
    console.log("Profile Update Failed Error:"+error);
       toast("ProfileUpdate Failed !!")  

    
   }finally{
    loadingSet(false)

   }
  };
  return (
     <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Update Profile</h2>

      <div className="space-y-3">
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChangeForPI}
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChangeForPI}
          className="w-full p-2 border rounded"
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          onChange={handleChangeForPI}
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          onChange={handleChangeForPI}
          className="w-full p-2 border rounded"
        />
        <input
          name="skills"
          type="text"
          placeholder="Skills (comma separated)"
          onChange={handleChangeForPI}
          className="w-full p-2 border rounded"
        />
        <input
          name="position"
          type="text"
          placeholder="Position"
          onChange={handleChangeForPI}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="about"
          placeholder="About you"
          onChange={handleChangeForPI}
          className="w-full p-2 border rounded h-24"
        />
        <input
          name="file"
          type="file"
          onChange={handleChangeForPPic}
          className="w-full p-2"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
