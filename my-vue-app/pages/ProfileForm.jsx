import axios from "axios";
import React, { useState } from "react";

const ProfileForm = (props) => {
  const [personalInfo, setpersonalInfo] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const [profilePic, setprofilePic] = useState({});
  const handleChangeForPI = (e) => {
    setpersonalInfo({...personalInfo, [e.target.name]: e.target.value });
  };
  const handleChangeForPPic = (e) => {
    setprofilePic(e.target.files[0]);
  };
  const habdleSubmit =async () => {
    const formData=new FormData();
    Object.entries(personalInfo).forEach(([key,value])=>{
        formData.append(key,value);
    })
    if (profilePic){
        formData.append("profileImage",profilePic)
    }
   try {
    const res=await axios.put(`http://localhost:3001/user/${props.AdminName}/profile`,formData, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      if (res.data) console.log(res.data)
    

    
   } catch (error) {
    
   }
  };
  return (
    <div>
      <input
        name="username"
        type="username"
        placeholder="username"
        onChange={(e) => handleChangeForPI(e)}
      />
      <input
        name="email"
        type="email"
        placeholder="email"
        onChange={(e) => handleChangeForPI(e)}
      />
      <input
        name="address"
        type="address"
        placeholder="address"
        onChange={(e) => handleChangeForPI(e)}
      />
      <input
        name="phone"
        type="phone"
        placeholder="phone"
        onChange={(e) => handleChangeForPI(e)}
      />
      <input
        name="file"
        type="file"
        placeholder="image"
        onChange={(e) => handleChangeForPPic(e)}
      />
      <button onClick={habdleSubmit}>Submit</button>
    </div>
  );
};

export default ProfileForm;
