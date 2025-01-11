import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import lock from "../assets/icons8-lock-30.png";
import "./Account.css";

const Account = () => {
  const navigate = useNavigate();
  const { login, signup, currentStatus, setCurrentStatus, setIsLoggedIn, darkMode } =
    useContext(Context);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e, username, password) => {
    try {
      const logIn = await login(e, username, password);
      setIsLoggedIn(true);
      navigate("/dashboard/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignUp = async (e, username, password, firstname, lastname, email) => {
    try {
      const signUp = await signup(e, username, password, firstname, lastname, email);
      console.log("Sign up successfu;");
      setCurrentStatus("login");
    } catch (error) {
      console.log(error.data);
    }
  };
  return (
    <div className="flex flex-col items-center  h-100%">
      <Link to="/">
        <h1 className="3xl:text-4xl absolute top-0 left-0 sm:text-xl pl-7 pt-3 font-bold text-blue-600 pb-3">
          TASKHIVE
        </h1>
      </Link>
      <form
        className={` rounded-3xl ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } 3xl:w-[27%] my-auto md:w-50% sm:w-90% h-fit `}
        onSubmit={(e) => {
          currentStatus == "login"
            ? handleLogin(e, username, password)
            : handleSignUp(e, username, password, firstname, lastname, email);
        }}
      >
        <div className="flex flex-col 3xl:gap-y-2 sm:gap-y-2 pl-10 pr-10 pt-5 pb-10">
          <div className="flex flex-col">
            <h1 className="text-center 3xl:text-xl sm:text-xl font-semibold">
              {currentStatus === "login" ? "Welcome Back!" : "Sign up"}
            </h1>
            <div className="flex gap-1 justify-center">
              <img src={lock} alt="" className="w-6" />
              <p className="flex items-center 3xl:text-15 sm:text-15">All data will be encrypted</p>
            </div>
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="input" className="font-semibold pb-1 3xl:text-15 sm:text-14">
              Username
            </label>
            <input
              type="username"
              className={`  border-1 rounded-md p-2 3xl:w-full  sm:w-full sm:h-10 3xl:h-12 focus:border-2 focus:border-blue-500 outline-none  ${
                darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
              }`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {currentStatus === "signup" ? (
            <div className="flex flex-col 3xl:gap-y-2 sm:gap-y-2">
              <div className="grid grid-cols-2 3xl:gap-x-4 sm:gap-x-2">
                <div className="flex flex-col relative">
                  <label htmlFor="input" className="font-semibold pb-1 3xl:text-15 sm:text-14">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`  border-1 rounded-md p-2 3xl:w-full  sm:w-full sm:h-10 3xl:h-12 focus:border-2 focus:border-blue-500 outline-none  ${
                      darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                    }`}
                    placeholder="First Name"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col relative">
                  <label htmlFor="input" className="font-semibold pb-1 3xl:text-15 sm:text-14">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`  border-1 rounded-md p-2 3xl:w-full  sm:w-full sm:h-10 3xl:h-12 focus:border-2 focus:border-blue-500 outline-none  ${
                      darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                    }`}
                    placeholder="Last Name"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col relative">
                <label htmlFor="input" className="font-semibold pb-1 3xl:text-15 sm:text-14">
                  Email
                </label>
                <input
                  type="email"
                  className={`  border-1 rounded-md p-2 3xl:w-full  sm:w-full sm:h-10 3xl:h-12 focus:border-2 focus:border-blue-500 outline-none  ${
                    darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                  }`}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col relative">
            <label htmlFor="input" className="font-semibold pb-1 3xl:text-15 sm:text-14 ">
              Password
            </label>
            <input
              type="password"
              className={`  border-1 rounded-md p-2 3xl:w-full  sm:w-full sm:h-10 3xl:h-12 focus:border-2 focus:border-blue-500 outline-none  ${
                darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
              }`}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className=" 3xl:py-2 sm:py-1 w-full rounded-lg bg-dark-white  3xl:text-17 sm:text-18 font-semibold bg-blue-600 text-white "
            >
              {currentStatus === "login" ? "Sign in" : "Sign up"}
            </button>

            <div className="flex place-items-start  gap-3 w-full  py-3">
              <input type="checkbox" className="mt-2" required />
              <p className="text-myGrey 3xl:text-16 sm:text-13">
                By continuing, I agree to the terms of use & privacy policy.
              </p>
            </div>

            {currentStatus === "login" ? (
              <p className="text-center 3xl:text-16 sm:text-14">
                Create an Account?
                <span
                  onClick={() => setCurrentStatus("signup")}
                  className="cursor-pointer ml-1 text-dark-yellow font-semibold  text-blue-600"
                >
                  Click here
                </span>
              </p>
            ) : (
              <p className="text-center text-15">
                Already have an Account?
                <span
                  onClick={() => setCurrentStatus("login")}
                  className="cursor-pointer ml-1 text-dark-yellow font-semibold text-blue-600"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </div>
      </form>
      <h1
        className={`flex  mt-auto mb-3 3xl:text-17 sm:text-14 gap-x-2 items-center ${
          darkMode == "dark" ? " text-anti-flash-white" : ""
        }`}
      >
        <span className="text-blue-600 font-bold">TASKHIVE</span> Everything app for Task Management
      </h1>
    </div>
  );
};

export default Account;
