import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdTaskAlt } from "react-icons/md";
import { GrProjects } from "react-icons/gr";

const Navbar = () => {
  const { logout, setIsLoggedIn, isLoggedIn, setCurrentStatus, darkMode } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [active, setActive] = useState("");
  return (
    <nav className="lg: ">
      <div className={`lg:flex gap-x-2 items-center sm:hidden p-3`}>
        <h1 className={`text-blue-600  lg:text-3xl sm:text-2xl font-bold `}>
          <span className="font-normal">Task</span>Hive
        </h1>
      </div>

      {isLoggedIn ? (
        <ul
          className={`lg:flex lg:flex-col lg:gap-y-5 sm:gap-y-5 text-16 lg:pt-12 sm:px-5 sm:py-[6px] sm:flex sm:absolute lg:relative sm:w-full ${
            darkMode == "dark" ? "lg:bg-myblack" : ""
          } sm:bottom-0 sm:justify-between  sm:bg-white sm:h-fit`}
        >
          <Link to="/dashboard/">
            <div
              className={`flex items-center  lg:justify-start gap-x-1 lg:py-3 ${
                darkMode == "dark" ? "text-anti-flash-white" : ""
              }  cursor-pointer  ${
                location.pathname == "/dashboard/"
                  ? "text-blue-600 lg:bg-blue-200  sm:px-2 lg:w-full sm:w-full  rounded-xl font-semibold "
                  : "px-2"
              }`}
            >
              <MdDashboard className="lg:w-5 lg:h-5 sm:w-4 sm:h-4" />
              <li className={`lg:block text-15 sm:hidden`}>Dashboard</li>
            </div>
          </Link>
          <Link to="/projects/">
            <div
              className={`flex items-center lg:justify-start gap-x-1 lg:py-3 ${
                darkMode == "dark" ? "text-anti-flash-white" : ""
              }  cursor-pointer  ${
                location.pathname == "/projects/"
                  ? "text-blue-600 lg:bg-blue-200  sm:px-2 lg:w-full sm:w-full  rounded-xl font-semibold "
                  : " px-2"
              }`}
            >
              <GrProjects className="lg:w-5 lg:h-5 sm:w-4 sm:h-4" />
              <li className={`lg:block text-15 sm:hidden`}>Projects</li>
            </div>
          </Link>

          <Link to="/task/">
            <div
              className={`flex items-center lg:justify-start gap-x-1 lg:py-3 ${
                darkMode == "dark" ? "text-anti-flash-white" : ""
              }  cursor-pointer  ${
                location.pathname == "/task/"
                  ? "text-blue-600 lg:bg-blue-200  sm:px-2 lg:w-full sm:w-full  rounded-xl font-semibold "
                  : " px-2"
              }`}
            >
              <FaTasks className="lg:w-5 lg:h-5 sm:w-4 sm:h-4" />
              <li className={`lg:block text-15 sm:hidden`}>Tasks</li>
            </div>
          </Link>

          <Link to="/team/">
            <div
              className={`flex items-center lg:justify-start gap-x-1 lg:py-3 ${
                darkMode == "dark" ? "text-anti-flash-white" : ""
              }  cursor-pointer  ${
                location.pathname == "/team/"
                  ? "text-blue-600 lg:bg-blue-200  sm:px-2 lg:w-full sm:w-full  rounded-xl font-semibold "
                  : "  px-2"
              }`}
            >
              <RiTeamFill className="lg:w-5 lg:h-5 sm:w-4 sm:h-4" />
              <li className={`lg:block text-15 sm:hidden`}>Team</li>
            </div>
          </Link>
          <li></li>
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
