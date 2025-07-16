//pages/loginpage
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Link} from "react-router-dom"
import { uri } from "../components/URL";
const Loginpage = ({ login, authenticated, setrole, setAdminName }) => {
  const navigate = useNavigate();
  const [logined, setlogined] = useState(false);
  const [RegisterPop, setRegisterPop] = useState(false);
  const [message, setMessage] = useState("");
  const [BtnACtion, setBtnACtion] = useState("");
  const [loading2, setLoading2] = useState(false);

  const [form, setform] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [SecurePinPopUp, setSecurePinPopUp] = useState(false);

  //states for security pin
  const [pin, setPin] = useState("");
  const [inputpin, setinputpin] = useState("");

  const HandleInputPin = (e) => {
    setinputpin(e.target.value);
    // console.log(inputpin)
  };

  const padZero = (num) => (num < 10 ? "0" + num : String(num));

  const generatePinFromDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = padZero(today.getMonth() + 1);
    const day = padZero(today.getDate());

    const generatedPin = `${day}${month}${year}`; // Format as DDMMYYYY
    setPin(generatedPin);
  };

  useEffect(() => {
    generatePinFromDate();
  }, []);

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

  //HandleRegisterSecurity function
  const HandleRegisterSecurity = (e) => {
    if (inputpin == pin) {
      handleRegister(e);
      alert("handle register trigered");
    } else {
      setSecurePinPopUp(false);
      alert("Wrong pin");
    }
  };

  const handleRegister = async (e) => {
    //something
    e.preventDefault();
    setLoading2(true);
    setSecurePinPopUp(false);
    try {
      await axios.post(`${uri}/register`, form);
      // alert("✅Register Succesfull!!!");
      setlogined(true);
      setMessage("✅ Register Succesfull!!!");
      setBtnACtion("User Registered");

      // handleLogin();
    } catch {
      // alert("✅ Registeration Failed!!");

      setlogined(true);
      setMessage("❌ Register Failed!!!");
      setBtnACtion("Retry");
    } finally {
      setLoading2(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading2(true);
    try {
      const res = await axios.post(`${uri}/login`, form);

      if (res.data.token) {
        login(res.data.token); // Set token (triggers authenticated)
        // setrole?.(res.data.role); // optional: store role in state
        updateRole(res.data.role);
        setlogined(res.data.token.length > 0);
        // alert("token lenght"+res.data.token.length)

        localStorage.setItem("AdminName", res.data.username);
        setAdminName(res.data.username);
        setMessage(`✅ Login Successful`);
        setBtnACtion("Proceed");
        // alert
        //   `✅ Login Successful as ${res.data.role}\n🔑 Token: ${res.data.token}`
        // );

        // navigate("/"); // go to dashboard or home
      }
    } catch (err) {
      console.error(err);
      // alert("❌ Login Failed");
      setlogined(true);

      setMessage(`❌ Login Failed`);
      setBtnACtion("Retry");
    } finally {
      setLoading2(false);
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
        <div className="bg-meri text-center py-6 border-b border-gray-400 bg-heading ">
          <h1 className="text-lg font-bold text-Color">MERINet Login</h1>
              
        </div>

        {/* Form */}
        <div className="bg-white p-6 space-y-4">
          <form>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-1"
              >
                Username
              </label>
              <div className="flex items-center border border-gray-400 bg-white">
                <span className="bg-gray-200 p-2" role="img" aria-label="email">
                  📧
                </span>
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
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-1"
              >
                Password
              </label>
              <div className="flex items-center border border-gray-400 bg-white">
                <span className="bg-gray-200 p-2" role="img" aria-label="lock">
                  🔒
                </span>
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
            {/* <fieldset className="text-sm font-medium">
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
          </label> <label className="ml-4">
            <input
              type="radio"
              name="role"
              value="superAdmin"
              checked={form.role === "superAdmin"}
              onChange={handleChange}
              className="mr-1"
            />
            superAdmin
          </label>
        </fieldset> */}

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              {!RegisterPop && (
                <button
                  onClick={handleLogin}
                  className="flex-1 bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700"
                >
                  🔐 Login
                </button>
              )}
              {RegisterPop && (
                <button
                  type="button"
                  // onClick={handleRegister}
                  onClick={(e) => {
                    e.preventDefault();
                    setSecurePinPopUp(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700"
                >
                  👤 Register
                </button>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-center text-sm mt-2">
              <span className="text-gray-600 hover:underline">
                {" "}
                {!RegisterPop ? (
                  <span>
                    {" "}
                    Don't have account?{" "}
                    <span
                      onClick={() => setRegisterPop(!RegisterPop)}
                      className="text-blue-500 cursor-pointer "
                    >
                      Sign UP
                    </span>
                  </span>
                ) : (
                  <span>
                    Already have account ?{" "}
                    <span
                      onClick={() => setRegisterPop(!RegisterPop)}
                      className="text-blue-500 cursor-pointer "
                    >
                      {" "}
                      Sign IN
                    </span>{" "}
                  </span>
                )}{" "}
              </span>
            </div>
          </form>
        </div>

        {/* Support Notice */}
        <div className="bg-box-col text-sm text-center px-4 py-2 border-t border-gray-300">
          For technical assistance, please contact:
          <br />
          <strong>
            IT Support at{" "}
            <a
              href="mailto:support@cmeri.res.in"
              className="text-blue-600 underline"
            >
              rhaldar.cmeri@csir.res.in, 9051368379
            </a>
          </strong>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-700 py-3 border-t border-gray-300">
          © 2011 CMERI Durgapur | All Rights Reserved
          <br />
          Developed & Maintained by{" "}
          <Link className="text-blue-500 cursor-pointer" to="/contributors">Contributrs</Link>
        </div>
      </div>

      {/* Popup Overlay */}
      <div
        className={`w-full ${
          logined ? "flex" : "hidden"
        } h-[80vh] transition ease-in-out duration-100 items-center justify-center backdrop-blur-sm absolute`}
      >
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

      {SecurePinPopUp && (
        <div className="fixed  inset-0 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center">
          <div className="h-min p-7 flex flex-col justify-center gap-4 shrink flex-wrap text-black  bg-white shadow-md  shadow-gray-400 rounded-2xl">
            <h3 className="text-xl text-red-500  font-bold font-sans text-center ">
              Enter Verification code
            </h3>
            <div className="flex justify-center items-center flex-col gap-2.5">
              {" "}
              <input
                onChange={(e) => HandleInputPin(e)}
                // ref={InputRef}
                placeholder="Verification code"
                className="bg-gray-100 px-3.5 py-1 outline-none sm:w-full max-w-full text-center rounded-lg focus:ring-blue-400 focus:ring-1 border-1 border-blue-300 focus:border-none"
                type="text"
              />
              <button
                type="button"
                onClick={(e) => HandleRegisterSecurity(e)}
               className="bg-red-600 hover:scale-105 py-1 px-2 rounded-xl text-white hover:bg-red-500 transition-[0.3s] cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loginpage;
{
  /*    
  
<div className="backdrop-blur-md max-w-full h-dvh flex justify-center items-center sm:w-full overflow-hidden overflow-y-hidden text-black font-serif">
        <div className="h-min p-7 flex flex-col justify-center gap-4 shrink flex-wrap text-black font-serif bg-cyan-50 shadow-md  shadow-gray-400 rounded-2xl">
          <h3 className="text-xl font-bold text-center">Enter Verification code</h3>
          <div className="flex justify-center items-center flex-col gap-2.5">
            <input
              ref={InputRef}
            
              placeholder="PIN code"
              className="bg-white px-3.5 py-1 outline-none sm:w-full max-w-full text-center rounded-lg focus:ring-blue-400 focus:ring-1 border-1 border-black focus:border-none"
            />
            <button className="bg-cyan-600 py-1 px-2 rounded-xl text-white hover:rounded-2xl transition-[0.3s] cursor-pointer">Register</button>
          </div>
        </div>
      </div>


  */
}
