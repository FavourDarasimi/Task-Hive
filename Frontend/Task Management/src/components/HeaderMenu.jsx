import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaPlus } from "react-icons/fa";
import { FcInvite } from "react-icons/fc";
import { GoInbox, GoPlus } from "react-icons/go";
import { Switch } from "@headlessui/react";
import { MdLogout } from "react-icons/md";

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
      {activeWorkspace && workspaces ? (
        <div className="flex items-center whitespace-nowrap gap-x-3">
          <div className="h-11 w-11 text-17 font-semibold rounded-full text-white flex justify-center items-center bg-purple-700">
            {getFirstLetter(activeWorkspace.name)}
          </div>
          <div>
            <h1 className="text-14 font-semibold">{activeWorkspace.name}</h1>
            <div className="flex gap-x-2 items-center">
              <h1 className="text-14 text-gray-500 font-semibold">#{activeWorkspace.space_id}</h1>
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

      <div
        className="flex gap-x-2 items-center mt-3 cursor-pointer"
        onClick={() => setShowProfile(true)}
      >
        <FaRegUserCircle className="w-4 h-4" />
        <h1 className="text-14">Profile</h1>
      </div>
      <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => setShowInbox(true)}>
        <GoInbox className="w-4 h-4" />
        <h1 className="text-14">Inbox</h1>
      </div>
      <div
        className="flex gap-x-2 items-center cursor-pointer"
        onClick={() => setShowInvites(true)}
      >
        <FcInvite className="w-4 h-4" />
        <h1 className="text-14">Invites</h1>
      </div>

      <div className="flex gap-x-2 items-center">
        <h1 className="text-14">Dark</h1>
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

      <div className="flex gap-x-2 items-center cursor-pointer" onClick={(e) => handlelogout(e)}>
        <MdLogout className="w-4 h-4" />
        <h1 className="text-14">Log Out</h1>
      </div>

      <div className="mt-2 border-t-1 border-gray-200 -mx-5"></div>
      <div className="pt-2">
        <h1 className="text-16 pb-3 font-semibold">Switch Workspace</h1>
        <div className="flex flex-col gap-y-4">
          {workspaces && workspaces.length > 1 ? (
            workspaces.map((workspace) => (
              <div key={workspace.id}>
                {getTrue(JSON.stringify(workspace.active)) ? (
                  ""
                ) : (
                  <div
                    className={`flex items-center whitespace-nowrap gap-x-3 ${
                      darkMode == "dark" ? "hover:bg-myblack" : "hover:bg-gray-300"
                    } rounded-xl p-2 cursor-pointer`}
                    onClick={() => switchWorkspaceFunction(activeWorkspace.id, workspace.id)}
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
                )}
              </div>
            ))
          ) : (
            <h1 className="text-14 whitespace-nowrap">Create a new workspace to get started</h1>
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
  );
};

export default HeaderMenu;
