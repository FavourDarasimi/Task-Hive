import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdTaskAlt } from "react-icons/md";
import { GrProjects } from "react-icons/gr";

const Navbar = () => {
  const { logout, setIsLoggedIn, isLoggedIn, setCurrentStatus, darkMode } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const logOut = await logout(e);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [active, setActive] = useState("");
  return (
    <nav className="lg:p-5 ">
      <h1
        className={`flex lg:hidden ${isOpen ? "justify-end" : "justify-center"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        show
      </h1>
      <div className={`flex gap-x-2 items-center sm:justify-center`}>
        <MdTaskAlt className="text-blue-600 lg:w-12 lg:h-12 sm:w-10 sm:h-10   " />
        <h1
          className={`text-blue-600 lg:block lg:text-4xl sm:text-3xl font-extrabold ${
            isOpen ? "" : "sm:hidden"
          }`}
        >
          TaskHive
        </h1>
      </div>

      {isLoggedIn ? (
        <ul className="flex flex-col lg:gap-y-7 sm:gap-y-5 text-16 lg:pt-16 sm:pt-10">
          <Link to="/dashboard/">
            <div
              className={`flex items-center  lg:justify-start gap-x-1 ${
                darkMode == "dark" ? "text-anti-flash-white" : ""
              } ${isOpen ? "" : "sm:justify-center"} cursor-pointer  ${
                location.pathname == "/dashboard/"
                  ? "bg-blue-600 py-3 sm:px-2  lg:w-full sm:w-full   rounded-xl font-semibold text-white"
                  : " py-3 px-2"
              }`}
            >
              <MdDashboard className="w-5 h-5" />
              <li className={`lg:block ${isOpen ? "sm:block" : "sm:hidden"}`}>Dashboard</li>
            </div>
          </Link>
          <Link to="/projects/">
            <div
              className={`flex items-center lg:justify-start gap-x-1 ${
                darkMode == "dark" ? "text-anti-flash-white" : ""
              } ${isOpen ? "" : "sm:justify-center"} cursor-pointer  ${
                location.pathname == "/projects/"
                  ? "bg-blue-600  py-3  sm:px-2 lg:w-full sm:w-full  rounded-xl font-semibold text-white"
                  : " py-3 px-2"
              }`}
            >
              <GrProjects className="w-5 h-5" />
              <li className={`lg:block ${isOpen ? "sm:block" : "sm:hidden"}`}>Projects</li>
            </div>
          </Link>

          <Link to="/task/">
            <div
              className={`flex items-center lg:justify-start gap-x-1 ${
                darkMode == "dark" ? "text-anti-flash-white" : ""
              } ${isOpen ? "" : "sm:justify-center"} cursor-pointer  ${
                location.pathname == "/task/"
                  ? "bg-blue-600  py-3 sm:px-2 lg:w-full sm:w-full  rounded-xl font-semibold text-white"
                  : " py-3 px-2"
              }`}
            >
              <FaTasks className="w-5 h-5" />
              <li className={`lg:block ${isOpen ? "sm:block" : "sm:hidden"}`}>Tasks</li>
            </div>
          </Link>

          <Link to="/team/">
            <div
              className={`flex items-center lg:justify-start gap-x-1 ${
                darkMode == "dark" ? "text-anti-flash-white" : ""
              } ${isOpen ? "" : "sm:justify-center"} cursor-pointer  ${
                location.pathname == "/team/"
                  ? "bg-blue-600 py-3 sm:px-2 lg:w-full sm:w-full  rounded-xl font-semibold text-white"
                  : " py-3 px-2"
              }`}
            >
              <RiTeamFill className="w-5 h-5" />
              <li className={`lg:block ${isOpen ? "sm:block" : "sm:hidden"}`}>Team</li>
            </div>
          </Link>

          <div
            className={`flex items-center justify-center px-1 gap-x-1 cursor-pointer absolute bottom-0 pb-5 ${
              darkMode == "dark" ? "text-anti-flash-white" : ""
            } `}
            onClick={(e) => handlelogout(e)}
          >
            <MdLogout className="w-5 h-5" />
            <li className={`lg:block ${isOpen ? "sm:block" : "sm:hidden"}`}>Log Out</li>
          </div>
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
