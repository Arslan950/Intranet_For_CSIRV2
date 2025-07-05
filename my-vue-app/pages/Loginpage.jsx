//pages/loginpage
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loginpage = ({ login, authenticated, setrole, setAdminName }) => {
  const navigate = useNavigate();
  const [logined, setlogined] = useState(false)
  const [message, setMessage] = useState('')
  const [BtnACtion, setBtnACtion] = useState('')

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
    try {
      await axios.post("http://localhost:3001/register", form);
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

    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", form);

      if (res.data.token) {
        login(res.data.token); // Set token (triggers authenticated)
        // setrole?.(res.data.role); // optional: store role in state
        updateRole(res.data.role);
        setlogined( res.data.token.length>0)
        // alert("token lenght"+res.data.token.length)

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
    }
  };

  return (
    <div className="bg-[#1f2836] text-white flex justify-center items-center min-h-screen transition ease-in-out">
      <div className="bg-[#101826] rounded-4xl p-6 max-w-sm w-full shadow-xl shadow-[#ffffff17]">
        <h2 className="text-center text-white font-bold text-3xl mb-4 ">
          Login
        </h2>
        <form>
          <div className="mb-10 ">
            <label htmlFor="" className="block text-xl font-semibold mb-5">
              Email
            </label>
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              type="text"
              className="w-full text-xl pl-4 py-2 text-blue-700 font-medium bg-white focus:outline-none rounded-2xl"
            />
          </div>
          <div className="mb-10">
            <label htmlFor="" className="block text-xl font-semibold mb-5">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              value={form.password}
              type="password"
              className="w-full text-xl pl-4 py-2 text-blue-700 font-medium bg-white focus:outline-none rounded-2xl"
            />
          </div>
          <div className="text-xl mb-10 font-medium flex gap-x-3">
            <label htmlFor="role">Role (Admin or User)</label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              className="bg-white text-black rounded-lg px-1 " /*onChange={handleChange}*/
            >
              <option className="text-black text-sm" value="user">
                User
              </option>
              <option className="text-black text-sm" value="admin">
                Admin
              </option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4 text-xl">
            <button
              // type="submit"
              onClick={handleLogin}
              className="bg-blue-400 w-full font-semibold text-white py-3 rounded-2xl hover:bg-blue-500  focus:ring focus:ring-orange-50 active:bg-blue-800"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="bg-blue-400 w-full focus:ring focus:ring-orange-50 font-semibold text-white py-3 rounded-2xl hover:bg-blue-500 active:bg-blue-800"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <div className={`w-full ${logined? "flex": "hidden"}  h-full transition ease-in-out duration-100 items-center justify-center  backdrop-blur-sm absolute`}>
        <div className="w-[300px] transition ease-out duration-500  flex flex-col p-3.5 gap-y-8 items-center justify-center  text-black bg-white rounded-md shadow-white shadow-2xl ">
          <h1 className="text-2xl text-center font-bold"> {message}</h1>
          <button onClick={()=>{
         if (BtnACtion==="Proceed")   navigate("/");
         else if (BtnACtion==="User Registered")   setlogined(false);
         else if (BtnACtion==="Retry")   setlogined(false);


          }} className="bg-green-600  text-white font-medium px-3 py-1 rounded-md">{`${BtnACtion}`}</button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
