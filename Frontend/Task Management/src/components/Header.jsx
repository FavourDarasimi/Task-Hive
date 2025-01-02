import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { IoIosNotifications, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FcInvite } from "react-icons/fc";
import { FaRegUserCircle, FaPlus } from "react-icons/fa";
import { GoInbox, GoPlus } from "react-icons/go";
import { Switch } from "@headlessui/react";
import Invitations from "./Invitations";

const Header = ({
  setShowInvites,
  setShowInbox,
  setShowCreateWorkspace,
  showCreateWorkspace,
  status,
}) => {
  const {
    getTaskDueToday,
    user_is_authenticated,
    token,
    username,
    setUsername,
    getFirstLetter,
    darkMode,
    setDarkMode,
    getUserUnreadNotification,
    markAsRead,
    markAllAsRead,
    getUserWorkspaces,
    switchWorkspace,
    user,
  } = useContext(Context);

  const [showMenu, setShowMenu] = useState(false);
  const [read, setRead] = useState();
  const [notifications, setNotifications] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState();
  const [showNotification, setShowNotification] = useState(false);
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

  const getNewName = (name) => {
    const newName = name.charAt(0).toUpperCase() + name.slice(1);
    return newName;
  };

  const switchWorkspaceFunction = async (last_id, new_id) => {
    const response = await switchWorkspace(last_id, new_id);
    setSwitched(new_id);
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
  }, [showCreateWorkspace, switched, status]);

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

  const handleReadClick = async (id) => {
    if (id) {
      try {
        const response = await markAsRead(id);
        setRead(id);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await markAllAsRead();
        setRead(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTrue = (data) => {
    let result = false;
    if (data.includes(JSON.stringify(user))) {
      result = true;
    }
    return result;
  };

  return (
    <div className="">
      <div
        className={`flex justify-between ${
          darkMode == "dark" ? "bg-myblack text-anti-flash-white" : "bg-white"
        } lg:px-10 sm:pl-3 sm:pr-10 py-4 `}
      >
        <h1 className="lg:text-18 sm:text-14 font-bold ">
          Hello {getNewName(username)} &#128512; ({activeWorkspace ? activeWorkspace.name : ""})
        </h1>
        <h1 className="lg:text-18 font-bold sm:text-14">{getTodaysDate()}</h1>
        <div className="flex space-x-5">
          <div className="relative">
            <IoIosNotifications
              onClick={() => handleClick()}
              className="lg:w-6 lg:h-6 sm:w-5 sm:h-5"
            />
            {notifications.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-600 rounded-full w-2 h-2"></div>
            )}
            {showNotification ? (
              <div
                className={`absolute ${
                  darkMode == "dark" ? "bg-myblack2" : "bg-white"
                } mt-6 w-96 right-0 p-5 rounded-3xl shadow-2xl`}
              >
                {notifications.length > 0 ? (
                  <div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-semibold">Your Notifications</h1>
                      {notifications.length > 0 && (
                        <div
                          onClick={() => handleReadClick()}
                          className="flex gap-x-1 text-blue-800  items-center"
                        >
                          <IoCheckmarkDoneOutline />
                          <h1 className="text-13 font-bold cursor-pointer">Mark all as read</h1>
                        </div>
                      )}
                    </div>

                    {notifications.map((notification) => (
                      <div
                        className={`py-4 ${
                          darkMode == "dark"
                            ? "border-b-black border-b-1"
                            : "border-b-mygrey border-b-1"
                        }`}
                      >
                        <div className="flex gap-x-2 pb-2">
                          <div className="bg-blue-700 h-3 w-3 mt-1 rounded-full"></div>
                          <h1 className="text-15 font-medium">{notification.message}</h1>
                        </div>
                        <div className="flex justify-between pl-4">
                          <h1 className="text-gray-400 text-13">
                            {new Date(notification.date_created).toLocaleString()}
                          </h1>
                          <div
                            className="flex gap-x-1 text-blue-500 items-center cursor-pointer"
                            onClick={() => handleReadClick(notification.id)}
                          >
                            {" "}
                            <IoCheckmarkDoneOutline />{" "}
                            <h1 className="text-13 font-medium">Mark as read</h1>
                          </div>
                        </div>
                      </div>
                    ))}
                    <h1 className="text-15 text-blue-700 font-semibold pt-5">View Inbox</h1>
                  </div>
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
            <div className="flex items-center gap-x-1">
              <div className="h-6 w-6 text-12 rounded-full text-white flex justify-center items-center bg-purple-700">
                {username ? getFirstLetter(username) : ""}
              </div>
              {showMenu ? (
                <IoIosArrowUp className="cursor-pointer" onClick={() => setShowMenu(false)} />
              ) : (
                <IoIosArrowDown className="cursor-pointer" onClick={() => setShowMenu(true)} />
              )}
            </div>
            <div
              className={`${
                showMenu
                  ? `flex flex-col gap-y-4 absolute ${
                      darkMode == "dark" ? "bg-myblack2" : "bg-white"
                    } mt-6 w-fit right-0 p-5 rounded-lg shadow-2xl`
                  : "hidden "
              } `}
            >
              {activeWorkspace && workspaces ? (
                <div className="flex items-center whitespace-nowrap gap-x-3">
                  <div className="h-11 w-11 text-17 font-semibold rounded-full text-white flex justify-center items-center bg-purple-700">
                    {getFirstLetter(activeWorkspace.name)}
                  </div>
                  <div>
                    <h1 className="text-14 font-semibold">{activeWorkspace.name}</h1>
                    <div className="flex gap-x-2 items-center">
                      <h1 className="text-14 text-gray-500 font-semibold">
                        #{activeWorkspace.space_id}
                      </h1>
                      <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                      <h1 className="text-14 text-gray-500 font-semibold">
                        {activeWorkspace.team.members.length}{" "}
                        {activeWorkspace.team.members.length > 1 ? "Members" : "Member"}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="flex gap-x-2 items-center mt-3">
                <FaRegUserCircle className="w-5 h-5" />
                <h1 className="text-16">Profile</h1>
              </div>
              <div
                className="flex gap-x-2 items-center cursor-pointer"
                onClick={() => setShowInbox(true)}
              >
                <GoInbox className="w-5 h-5" />
                <h1 className="text-16">Inbox</h1>
              </div>
              <div
                className="flex gap-x-2 items-center cursor-pointer"
                onClick={() => setShowInvites(true)}
              >
                <FcInvite className="w-5 h-5" />
                <h1 className="text-16">Invites</h1>
              </div>

              <div className="flex gap-x-2">
                <h1 className="text-16">Dark</h1>
                <Switch
                  checked={darkMode == "dark" ? true : false}
                  onChange={(e) => {
                    localStorage.setItem("toggle_Dark_mode", e ? "dark" : "light");
                    setDarkMode((prev) => (prev == "dark" ? "light" : "dark"));
                  }}
                  className={`w-10 h-4  ${
                    darkMode == "dark" ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                >
                  <span
                    className={`${
                      darkMode == "dark" ? "translate-x-5" : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>

              <div className="mt-2 border-t-1 border-gray-200 -mx-5"></div>
              <div className="pt-2">
                <h1 className="text-16 pb-3 font-semibold">Switch Workspace</h1>
                <div className="flex flex-col gap-y-4">
                  {workspaces && workspaces.length > 1 ? (
                    workspaces.map((workspace) =>
                      getTrue(JSON.stringify(workspace.active)) ? (
                        ""
                      ) : (
                        <div
                          className="flex items-center whitespace-nowrap gap-x-3 hover:bg-gray-300 rounded-xl p-2 cursor-pointer"
                          onClick={() => {
                            switchWorkspaceFunction(activeWorkspace.id, workspace.id);
                            window.location.reload();
                          }}
                        >
                          <div className="h-11 w-11 text-17 font-semibold rounded-full text-white flex justify-center items-center bg-purple-700">
                            {getFirstLetter(workspace.name)}
                          </div>
                          <div>
                            <h1 className="text-14 font-semibold">{workspace.name}</h1>
                            <div className="flex gap-x-2 items-center">
                              <h1 className="text-14 text-gray-500 font-semibold">
                                #{workspace.space_id}
                              </h1>
                              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                              <h1 className="text-14 text-gray-500 font-semibold">
                                {workspace.team.members.length}{" "}
                                {workspace.team.members.length > 1 ? "Members" : "Member"}
                              </h1>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <h1 className="text-14 whitespace-nowrap">
                      Create a new workspace to get started
                    </h1>
                  )}
                </div>
              </div>
              <div
                className="flex gap-x-2 items-center pt-5 cursor-pointer"
                onClick={() => setShowCreateWorkspace(true)}
              >
                <GoPlus />
                <h1>New Workspace</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
