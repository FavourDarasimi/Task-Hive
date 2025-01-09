import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../context/Context";
import { IoIosNotifications, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationMenu from "./NotificationMenu";
import HeaderMenu from "./HeaderMenu";

const Header = ({
  setShowInvites,

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
        } lg:px-10 sm:px-3 lg:py-2 sm:py-2 `}
      >
        <h1 className="lg:hidden text-blue-600 font-[1000] text-16">TASKHIVE</h1>
        <h1 className="lg:text-16 font-bold sm:text-11">{getTodaysDate()}</h1>
        <div className="flex space-x-4 items-center">
          <div className="relative">
            <IoIosNotifications
              onClick={() => handleClick()}
              className="lg:w-6 lg:h-6 sm:w-[16px] sm:h-[16px] sm:mt-1"
            />
            {notifications.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-600 rounded-full lg:w-2 lg:h-2 sm:w-[5px] sm:h-[5px] sm:mt-1"></div>
            )}
            {showNotification ? (
              <div
                className={`absolute ${
                  darkMode == "dark" ? "bg-myblack2" : "bg-white"
                } mt-6 w-96 right-0 p-5 rounded-3xl shadow-2xl overflow-y-auto max-h-screen`}
              >
                {notifications.length > 0 ? (
                  <NotificationMenu notifications={notifications} setRead={setRead} />
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
            <div className="flex items-center lg:gap-x-1 sm:gap-x-[2px]">
              <div className="lg:h-6 lg:w-6 sm:w-4 sm:h-4 sm:text-[8px] lg:text-12 rounded-full text-white flex justify-center items-center bg-purple-700">
                {activeWorkspace ? getFirstLetter(activeWorkspace.name) : ""}
              </div>
              {showMenu ? (
                <IoIosArrowUp
                  className="cursor-pointer lg:w-4 lg:h-4 sm:w-2 sm:h-2"
                  onClick={() => setShowMenu(false)}
                />
              ) : (
                <IoIosArrowDown
                  className="cursor-pointer lg:w-4 lg:h-4 sm:w-2 sm:h-2"
                  onClick={() => setShowMenu(true)}
                />
              )}
            </div>
            <HeaderMenu
              activeWorkspace={activeWorkspace}
              workspaces={workspaces}
              setShowProfile={setShowProfile}
              setShowInbox={setShowInbox}
              setShowInvites={setShowInvites}
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
