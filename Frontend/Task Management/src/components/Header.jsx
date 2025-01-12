import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../context/Context";
import { IoIosNotifications, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationMenu from "./NotificationMenu";
import HeaderMenu from "./HeaderMenu";

const Header = ({
  setShowInbox,
  setShowCreateWorkspace,
  showCreateWorkspace,
  status,
  setShowProfile,
  specificElementRef,
  showNotification,
  setShowNotification,
  showMenu,
  setShowMenu,
}) => {
  const {
    user_is_authenticated,
    token,
    setUsername,
    getFirstLetter,
    darkMode,
    setDarkMode,
    getUserUnreadNotification,
    getUserWorkspaces,
  } = useContext(Context);

  const location = useLocation();
  const [read, setRead] = useState();
  const [notifications, setNotifications] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState();
  const [switched, setSwitched] = useState();

  const getTodaysDate = () => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const day = date.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const finalFormatedDate = `${day}${daySuffix(day)} of ${
      formattedDate.split(" ")[1]
    }, ${date.getFullYear()}`;
    return finalFormatedDate;
  };

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const response = await getUserWorkspaces();
        console.table(response.workspaces);
        console.table(response.active);
        setWorkspaces(response.workspaces);
        setActiveWorkspace(response.active);
      } catch (error) {
        console.log(error);
      }
    };
    getWorkspaces();
  }, [showCreateWorkspace, switched, status, location]);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const response = await user_is_authenticated();
        const name = response.data.user.username;

        setUsername(name);
      } catch (error) {
        console.log(error);
      }
    };
    handleUser();
    const dark_mode = localStorage.getItem("toggle_Dark_mode");
    setDarkMode(dark_mode);
  }, [token]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getUserUnreadNotification();
        console.log(response);
        setNotifications(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [read]);

  const handleClick = async () => {
    setShowNotification((prev) => (prev == true ? false : true));
  };

  return (
    <div className="" ref={specificElementRef}>
      <div
        className={`flex justify-between items-center ${
          darkMode == "dark" ? "bg-myblack text-anti-flash-white" : "bg-white"
        } px-10 sm:px-2 3xl:py-2 2xl:py-2 sm:py-2 `}
      >
        <h1 className="3xl:hidden 2xl:hidden xl:hidden lg:hidden text-blue-600 font-[1000] text-16">
          <span className="font-[500]">TASK</span>HIVE
        </h1>
        <h1 className="3xl:text-16 2xl:text-14 xl:text-13 lg:text-12 font-bold sm:text-11 3xl:m-0 2xl:m-0 xl:m-0 lg:m-0 ">
          {getTodaysDate()}
        </h1>
        <div className="flex space-x-4 items-center">
          <div className="relative">
            <IoIosNotifications
              onClick={() => handleClick()}
              className="3xl:w-6 3xl:h-6 2xl:w-[20px] 2xl:h-[20px] xl:w-[19px] xl:h-[19px] lg:w-[18px] lg:h-[18px] sm:w-[17px] sm:h-[17px] sm:mt-1"
            />
            {notifications.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-600 rounded-full 3xl:w-2 3xl:h-2 2xl:w-[7px] 2xl:h-[7px] xl:w-[6px] xl:h-[6px] sm:w-[5px]  sm:h-[5px] sm:mt-1"></div>
            )}
            {showNotification ? (
              <div
                className={`absolute ${
                  darkMode == "dark" ? "bg-myblack2" : "bg-white"
                } mt-6 w-96 right-0  p-5 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]`}
              >
                {notifications.length > 0 ? (
                  <NotificationMenu
                    notifications={notifications}
                    setRead={setRead}
                    setShowInbox={setShowInbox}
                  />
                ) : (
                  <h1 className="text-center text-18 font-semibold">
                    Nothing new here. Check back later!
                  </h1>
                )}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="relative">
            <div className="flex items-center 3xl:gap-x-1 sm:gap-x-[2px]">
              <div className="3xl:h-6 3xl:w-6 2xl:h-5 2xl:w-5 xl:h-5 xl:w-5 sm:w-5 sm:h-5 sm:text-[9px] 3xl:text-12 2xl:text-11 xl:text-10 lg:text-10 rounded-full text-white flex justify-center items-center bg-purple-700">
                {activeWorkspace ? getFirstLetter(activeWorkspace.name) : ""}
              </div>
              {showMenu ? (
                <IoIosArrowUp
                  className="cursor-pointer 3xl:w-4 3xl:h-4 2xl:w-3 2xl:h-3 xl:w-3 xl:h-3  sm:w-2 sm:h-2"
                  onClick={() => setShowMenu(false)}
                />
              ) : (
                <IoIosArrowDown
                  className="cursor-pointer 3xl:w-4 3xl:h-4 s 2xl:w-3 2xl:h-3 xl:w-3 xl:h-3 m:w-2 sm:h-2"
                  onClick={() => setShowMenu(true)}
                />
              )}
            </div>
            <HeaderMenu
              activeWorkspace={activeWorkspace}
              workspaces={workspaces}
              setShowProfile={setShowProfile}
              setShowInbox={setShowInbox}
              setDarkMode={setDarkMode}
              setShowCreateWorkspace={setShowCreateWorkspace}
              showMenu={showMenu}
              setSwitched={setSwitched}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
