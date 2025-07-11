//pages/loginpage
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uri } from "../components/URL";
const Loginpage = ({ login, authenticated, setrole, setAdminName }) => {
  const navigate = useNavigate();
  const [logined, setlogined] = useState(false)
  const [message, setMessage] = useState('')
  const [BtnACtion, setBtnACtion] = useState('')
  const [loading2, setLoading2] = useState(false); 
  const [form, setform] = useState({
    username: "",
    password: "",
    role: "user",
  });
  
  const updateRole = (newRole) => {
    setrole(newRole);
    localStorage.setItem("role", newRole);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(form);
  };
  const handleRegister = async (e) => {
    //something
    e.preventDefault();
    setLoading2(true)
    try {
      await axios.post(`${uri}/register`, form);
      // alert("✅Register Succesfull!!!");
      setlogined(true)
      setMessage("✅ Register Succesfull!!!")
      setBtnACtion("User Registered")

      // handleLogin();
    } catch {
      // alert("✅ Registeration Failed!!");
      
      setlogined( true)
      setMessage("❌ Register Failed!!!")
      setBtnACtion("Retry")

    }finally{
      setLoading2(false)
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading2(true)
    try {
      const res = await axios.post(`${uri}/login`, form);

      if (res.data.token) {
        login(res.data.token); // Set token (triggers authenticated)
        // setrole?.(res.data.role); // optional: store role in state
        updateRole(res.data.role);
        setlogined( res.data.token.length>0)
        // alert("token lenght"+res.data.token.length)
        
        localStorage.setItem("AdminName",res.data.username)
        setAdminName?.(res.data.username);
        setMessage(`✅ Login Successful`)
        setBtnACtion("Proceed")
        // alert(
        //   `✅ Login Successful as ${res.data.role}\n🔑 Token: ${res.data.token}`
        // );

        // navigate("/"); // go to dashboard or home
      }
    } catch (err) {
      console.error(err);
      // alert("❌ Login Failed");
    setlogined( true)
      
      setMessage(`❌ Login Failed`)
      setBtnACtion("Retry")
    }finally{
      setLoading2(false)
    }
  };

  return (
   <div className="h-full bg-white flex items-start justify-center pt-10 font-sans min-h-screen">
  <div className="w-full max-w-md  mt-16 shadow-lg border border-gray-300">

    {/* Top News Bar */}
    {/* <div className="bg-red-700 text-white px-4 py-1 text-sm font-bold">
      News Flash: <span className="font-normal">MERI will appear here</span>
    </div> */}

    {/* Header */}
    <div className="bg-meri text-center py-6 border-b border-gray-400 bg-amber-300">
      <h1 className="text-lg font-bold text-black">MERINet Login</h1>
    </div>

    {/* Form */}
    <div className="bg-white p-6 space-y-4">
      <form>
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-semibold mb-1">Username</label>
          <div className="flex items-center border border-gray-400 bg-white">
            <span className="bg-gray-200 p-2" role="img" aria-label="email">📧</span>
            <input
              autoComplete="username"
              name="username"
              onChange={handleChange}
              value={form.username}
              type="text"
              className="w-full p-2 text-black focus:outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
          <div className="flex items-center border border-gray-400 bg-white">
            <span className="bg-gray-200 p-2" role="img" aria-label="lock">🔒</span>
            <input
              name="password"
              onChange={handleChange}
              value={form.password}
              type="password"
              autoComplete="current-password"
              className="w-full p-2 text-black focus:outline-none"
            />
          </div>
        </div>

        {/* Role as Radio */}
        <fieldset className="text-sm font-medium">
          <legend>Login Mode:</legend>
          <label className="ml-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={form.role === "user"}
              onChange={handleChange}
              className="mr-1"
            />
            User
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={form.role === "admin"}
              onChange={handleChange}
              className="mr-1"
            />
            Admin
          </label>
        </fieldset>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleLogin}
            className="flex-1 bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700"
          >
            🔐 Login
          </button>
          <button
            onClick={handleRegister}
            className="flex-1 border border-blue-600 text-blue-700 font-semibold hover:bg-blue-100"
          >
            👤 Register
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-center text-sm mt-2">
          <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
        </div>
      </form> 
    </div>

    {/* Support Notice */}
    <div className="bg-[#ffe49a] text-sm text-center px-4 py-2 border-t border-gray-300">
      For technical assistance, please contact:<br />
      <strong>
        IT Support at <a href="mailto:support@cmeri.res.in" className="text-blue-600 underline">support@cmeri.res.in</a>
      </strong>
    </div>

    {/* Footer */}
    <div className="text-center text-xs text-gray-700 py-3 border-t border-gray-300">
      © 2011 CMERI Durgapur | All Rights Reserved<br />
      Developed & Maintained by <a href="#" className="text-blue-600 underline">IT Group</a>
    </div>
  </div>

  {/* Popup Overlay */}
  <div className={`w-full ${logined ? "flex" : "hidden"} h-[80vh] transition ease-in-out duration-100 items-center justify-center backdrop-blur-sm absolute`}>
    <div className="w-[300px] transition ease-out duration-500 flex flex-col p-3.5 gap-y-8 items-center justify-center text-black bg-white rounded-md shadow-white shadow-2xl">
      <h1 className="text-2xl text-center font-bold">{message}</h1>
      <button
        onClick={() => {
          if (BtnACtion === "Proceed") navigate("/");
          else setlogined(false);
        }}
        className="bg-green-600 text-white font-medium px-3 py-1 rounded-md"
      >
        {BtnACtion}
      </button>
    </div>
  </div>
  {loading2 && (
  <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-md shadow-lg text-center">
      <h2 className="text-lg font-semibold mb-2">Loading...</h2>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
    </div>
  </div>
)}

</div>

  );
};

export default Loginpage;
