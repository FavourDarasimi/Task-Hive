import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdTaskAlt } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { logout, setIsLoggedIn, isLoggedIn, setCurrentStatus, darkMode } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [active, setActive] = useState("");
  return (
    <nav
      className={` bg-white md:w-100% 3xl:w-100% 2xl:w-100% xl:w-100% lg:h-screen  ${
        isOpen ? "lg:w-[15%]" : "lg:w-[5%]"
      }`}
    >
      {!isOpen ? (
        <div className="flex justify-center">
          <IoIosMenu
            className="3xl:hidden 2xl:hidden xl:hidden sm:hidden md:hidden lg:block mt-2 w-5 h-5"
            onClick={() => setIsOpen(true)}
          />
        </div>
      ) : (
        <div className="flex justify-end mr-2">
          <RxCross2
            className="3xl:hidden 2xl:hidden xl:hidden md:hidden lg:block mt-2 w-5 h-5 -mb-3"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}

      <div
        className={`3xl:flex 2xl:flex lg:flex xl:flex gap-x-2 p-3 items-center sm:hidden p- ${
          isOpen ? "lg:block" : "lg:hidden"
        }`}
      >
        <h1
          className={`text-blue-600  3xl:text-3xl 2xl:text-[28px] xl:text-[26px] lg:text-[24px] font-bold `}
        >
          <span className="font-normal">Task</span>Hive
        </h1>
      </div>

      <div
        className={`sm:hidden xl:hidden 2xl:hidden 3xl:hidden text-2xl p-3  ${
          isOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <h1 className="font-[1000] text-blue-600">
          <span className="font-[400] italic">T</span>H
        </h1>
      </div>

      {isLoggedIn ? (
        <ul
          className={`3xl:flex 3xl:flex-col 3xl:gap-y-5 xl:flex xl:flex-col xl:gap-y-5 lg:flex lg:flex-col lg:gap-y-7 2xl:flex 2xl:flex-col 2xl:gap-y-5 sm:gap-y-5 text-16 3xl:pt-12   2xl:pt-12 xl:pt-10 lg:pt-16 lg:px-1 sm:px-5 sm:py-[6px] sm:flex sm:absolute 3xl:relative 2xl:relative xl:relative lg:relative sm:w-full ${
            darkMode == "dark" ? "3xl:bg-myblack" : ""
          } sm:bottom-0 sm:justify-around md:justify-around md:left-0 md:right-0 lg:bg-none 4xl:border-none 3xl:border-none 2xl:border-none xl:border-none lg:border-none md:border-t-1 md:border-t-mygrey3 sm:bg-white sm:h-fit`}
        >
          <Link to="/dashboard/">
            <div
              className={`flex items-center 3xl:justify-start xl:justify-start gap-x-1 3xl:py-3 2xl:py-3 xl:py-3 lg:px-1 lg:py-2 ${
                isOpen ? "lg:justify-start lg:rounded-xl" : "lg:justify-center lg:rounded-full"
              }  ${darkMode == "dark" ? "text-anti-flash-white" : ""}  cursor-pointer  ${
                location.pathname == "/dashboard/"
                  ? "text-blue-600 3xl:bg-blue-200 2xl:bg-blue-200 xl:bg-blue-200 lg:bg-blue-200  3xl:px-2  2xl:px-2  xl:px-2   sm:px-2 lg:px-0 3xl:w-full sm:w-full  2xl:rounded-xl xl:rounded-xl 3xl:rounded-xl font-semibold "
                  : "3xl:px-2 2xl:px-2 xl:px-2 lg:px-1"
              }`}
            >
              <MdDashboard className="3xl:w-5 3xl:h-5 lg:w-4 lg:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <li
                className={`3xl:block 2xl:block xl:block 3xl:text-15 2xl:text-14 xl:text-13 lg:text-13 sm:hidden ${
                  isOpen ? "lg:block text-14" : ""
                }`}
              >
                Dashboard
              </li>
            </div>
          </Link>
          <Link to="/projects/">
            <div
              className={`flex items-center 3xl:justify-start xl:justify-start gap-x-1 3xl:py-3 2xl:py-3 xl:py-3 lg:px-1 lg:py-2 ${
                isOpen ? "lg:justify-start lg:rounded-xl" : "lg:justify-center lg:rounded-full"
              }${darkMode == "dark" ? "text-anti-flash-white" : ""}  cursor-pointer  ${
                location.pathname == "/projects/"
                  ? "text-blue-600 3xl:bg-blue-200 2xl:bg-blue-200 xl:bg-blue-200 lg:bg-blue-200  3xl:px-2  2xl:px-2  xl:px-2   sm:px-2 lg:px-0 3xl:w-full sm:w-full   2xl:rounded-xl xl:rounded-xl 3xl:rounded-xl font-semibold "
                  : " 3xl:px-2 2xl:px-2 xl:px-2 lg:px-1"
              }`}
            >
              <GrProjects className="3xl:w-5 3xl:h-5 lg:w-4 lg:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <li
                className={`3xl:block 2xl:block xl:block 3xl:text-15 2xl:text-14 xl:text-13 lg:text-13 sm:hidden ${
                  isOpen ? "lg:block text-14" : ""
                }`}
              >
                Projects
              </li>
            </div>
          </Link>

          <Link to="/task/">
            <div
              className={`flex items-center 3xl:justify-start xl:justify-start gap-x-1 3xl:py-3 2xl:py-3 xl:py-3 lg:px-1 lg:py-2 ${
                isOpen ? "lg:justify-start lg:rounded-xl" : "lg:justify-center lg:rounded-full"
              }${darkMode == "dark" ? "text-anti-flash-white" : ""}  cursor-pointer  ${
                location.pathname == "/task/"
                  ? "text-blue-600 3xl:bg-blue-200 2xl:bg-blue-200 xl:bg-blue-200 lg:bg-blue-200  3xl:px-2  2xl:px-2  xl:px-2   sm:px-2 lg:px-0 3xl:w-full sm:w-full   2xl:rounded-xl xl:rounded-xl 3xl:rounded-xl font-semibold "
                  : " 3xl:px-2 2xl:px-2 xl:px-2 lg:px-1"
              }`}
            >
              <FaTasks className="3xl:w-5 3xl:h-5 lg:w-4 lg:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <li
                className={`3xl:block 2xl:block xl:block 3xl:text-15 2xl:text-14 xl:text-13 lg:text-13 sm:hidden ${
                  isOpen ? "lg:block text-14" : ""
                }`}
              >
                Tasks
              </li>
            </div>
          </Link>

          <Link to="/team/">
            <div
              className={`flex items-center 3xl:justify-start xl:justify-start gap-x-1 3xl:py-3 2xl:py-3 xl:py-3 lg:px-1 lg:py-2 ${
                isOpen ? "lg:justify-start lg:rounded-xl" : "lg:justify-center lg:rounded-full"
              }${darkMode == "dark" ? "text-anti-flash-white" : ""}  cursor-pointer  ${
                location.pathname == "/team/"
                  ? "text-blue-600 3xl:bg-blue-200 2xl:bg-blue-200 xl:bg-blue-200 lg:bg-blue-200  3xl:px-2  2xl:px-2  xl:px-2   sm:px-2 lg:px-0 3xl:w-full sm:w-full   2xl:rounded-xl xl:rounded-xl 3xl:rounded-xl font-semibold "
                  : " 3xl:px-2 2xl:px-2 xl:px-2 lg:px-1"
              }`}
            >
              <RiTeamFill className="3xl:w-5 3xl:h-5 lg:w-4 lg:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <li
                className={`3xl:block 2xl:block xl:block 3xl:text-15 2xl:text-14 xl:text-13 lg:text-13 sm:hidden ${
                  isOpen ? "lg:block text-14" : ""
                }`}
              >
                Team
              </li>
            </div>
          </Link>
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
