import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaPlus, FaUserCircle, FaCircle } from "react-icons/fa";
import { FcInvite } from "react-icons/fc";
import { GoPlus } from "react-icons/go";
import { Switch } from "@headlessui/react";
import { MdLogout } from "react-icons/md";
import { IoCheckmark, IoMoonOutline, IoMailOutline } from "react-icons/io5";

const HeaderMenu = ({
  activeWorkspace,
  workspaces,
  setShowProfile,
  setShowInbox,
  setShowInvites,
  setDarkMode,
  setShowCreateWorkspace,
  showMenu,
  setSwitched,
}) => {
  const { darkMode, switchWorkspace, logout, getFirstLetter, user, setIsLoggedIn } =
    useContext(Context);
  const navigate = useNavigate();

  const getTrue = (data) => {
    let result = false;
    if (data.includes(JSON.stringify(user))) {
      result = true;
    }
    return result;
  };
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

  const switchWorkspaceFunction = async (last_id, new_id) => {
    const response = await switchWorkspace(last_id, new_id);
    setSwitched(new_id);
    navigate("/dashboard/");
    window.location.reload();
  };
  return (
    <div
      className={`${
        showMenu
          ? `flex flex-col gap-y-4 absolute ${
              darkMode == "dark" ? "bg-myblack2" : "bg-white"
            } mt-6 w-fit right-0 p-5 rounded-lg shadow-2xl`
          : "hidden "
      } `}
    >
      <h1 className="text-12 text-gray-500 font-semibold -mb-3">Switch Workspace</h1>
      <div className="flex flex-col gap-y-2">
        {activeWorkspace && workspaces ? (
          <div className="flex items-center whitespace-nowrap gap-x-3 py-1">
            {activeWorkspace.owner.profile.avatar ? (
              <img
                src={`http://127.0.0.1:8000/${activeWorkspace.owner.profile.avatar}`}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <FaUserCircle className="w-10 h-10" />
            )}

            <div>
              <h1 className="text-13 font-semibold">{activeWorkspace.name}</h1>
              <div className="flex gap-x-2 items-center">
                <h1 className="text-12 text-gray-500 font-semibold">#{activeWorkspace.space_id}</h1>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <h1 className="text-12 text-gray-500 font-semibold">
                  {activeWorkspace.team.members.length}{" "}
                  {activeWorkspace.team.members.length > 1 ? "Members" : "Member"}
                </h1>
              </div>
            </div>
            <IoCheckmark className="ml-5" />
          </div>
        ) : (
          ""
        )}
        {workspaces && workspaces.length > 1
          ? workspaces.map((workspace) =>
              getTrue(JSON.stringify(workspace.active)) ? (
                ""
              ) : (
                <div
                  className={`flex items-center whitespace-nowrap gap-x-3 py-1 ${
                    darkMode == "dark" ? "hover:bg-myblack" : "hover:bg-gray-100"
                  } rounded-xl  cursor-pointer`}
                  onClick={() => switchWorkspaceFunction(activeWorkspace.id, workspace.id)}
                >
                  {workspace.owner.profile.avatar ? (
                    <img
                      src={`http://127.0.0.1:8000/${workspace.owner.profile.avatar}`}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10" />
                  )}

                  <div>
                    <h1 className="text-13 font-semibold">{workspace.name}</h1>
                    <div className="flex gap-x-2 items-center">
                      <h1 className="text-12 text-gray-500 font-semibold">#{workspace.space_id}</h1>
                      <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                      <h1 className="text-12 text-gray-500 font-semibold">
                        {workspace.team.members.length}{" "}
                        {workspace.team.members.length > 1 ? "Members" : "Member"}
                      </h1>
                    </div>
                  </div>
                </div>
              )
            )
          : ""}
      </div>
      <div className=" border-t-1 border-gray-200 -mx-5"></div>
      <div className="flex flex-col gap-y-5">
        <div
          className="flex gap-x-2 items-center  cursor-pointer"
          onClick={() => setShowProfile(true)}
        >
          <FaRegUserCircle className="w-5 h-5" />
          <h1 className="text-15 font-semibold">Profile</h1>
        </div>
        <div
          className="flex gap-x-2 items-center cursor-pointer"
          onClick={() => setShowInbox(true)}
        >
          <IoMailOutline className="w-5 h-5" />
          <h1 className="text-15 font-semibold">Inbox</h1>
        </div>
        <div
          className="flex gap-x-2 items-center cursor-pointer"
          onClick={() => setShowInvites(true)}
        >
          <FcInvite className="w-5 h-5" />
          <h1 className="text-15 font-semibold">Invites</h1>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <IoMoonOutline className="w-5 h-5" />
            <h1 className="text-15 font-semibold">Dark</h1>
          </div>
          <Switch
            checked={darkMode == "dark" ? true : false}
            onChange={(e) => {
              localStorage.setItem("toggle_Dark_mode", e ? "dark" : "light");
              setDarkMode((prev) => (prev == "dark" ? "light" : "dark"));
            }}
            className={`w-10 h-[20px]  ${
              darkMode == "dark" ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                darkMode == "dark" ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
        <div
          className="flex gap-x-2 items-center cursor-pointer"
          onClick={() => setShowCreateWorkspace(true)}
        >
          <GoPlus className="w-5 h-5" />
          <h1 className="text-15 font-semibold">New Workspace</h1>
        </div>

        <div className="flex gap-x-2 items-center cursor-pointer" onClick={(e) => handlelogout(e)}>
          <MdLogout className="w-5 h-5" />
          <h1 className="text-15 font-semibold">Log Out</h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
