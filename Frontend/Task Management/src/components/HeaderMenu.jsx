import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaPlus, FaUserCircle } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { Switch } from "@headlessui/react";
import { MdLogout } from "react-icons/md";
import { IoCheckmark, IoMoonOutline, IoMailOutline } from "react-icons/io5";

const HeaderMenu = ({
  activeWorkspace,
  workspaces,
  setShowProfile,
  setShowInbox,
  setDarkMode,
  setShowCreateWorkspace,
  showMenu,
  setSwitched,
}) => {
  const { darkMode, switchWorkspace, logout, getFirstLetter, user, username, setIsLoggedIn } =
    useContext(Context);
  const navigate = useNavigate();

  const getTrue = (data) => {
    let result = [];
    data.map((value) => result.push(value.username));
    return result.includes(username);
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
            } mt-6 w-fit right-0 4xl:p-5 3xl:p-5 2xl:p-5 xl:p-5 lg:p-[14px] md:p-[11px] sm:p-3 rounded-lg shadow-2xl`
          : "hidden "
      } `}
    >
      <h1 className="4xl:text-13 3xl:text-12 2xl:text-[11.5px] xl:text-11 lg:text-[10.5px] md:text-10 sm:text-[9px] text-gray-500 font-semibold -mb-3 ">
        Switch Workspace
      </h1>
      <div className="flex flex-col gap-y-3">
        {activeWorkspace && workspaces ? (
          <div className="flex items-center whitespace-nowrap gap-x-3 pt-1">
            {activeWorkspace.owner.profile.avatar ? (
              <img
                src={`http://127.0.0.1:8000/${activeWorkspace.owner.profile.avatar}`}
                className="4xl:w-11 4xl:h-11 3xl:w-10 3xl:h-10 2xl:w-[38px] 2xl:h-[38px] xl:w-[34px] xl:h-[34px] lg:w-8 lg:h-8 md:w-[30px] md:h-[30px] sm:w-[28px] sm:h-[28px] rounded-full"
              />
            ) : (
              <FaUserCircle className="4xl:w-11 4xl:h-11 3xl:w-10 3xl:h-10 2xl:w-[38px] 2xl:h-[38px] xl:w-[34px] xl:h-[34px] lg:w-8 lg:h-8 md:w-[30px] md:h-[30px] sm:w-[28px] sm:h-[28px]" />
            )}

            <div>
              <h1 className="4xl:text-14 3xl:text-13 2xl:text-[12.4px] xl:text-[12px] lg:text-[11.5px] md:text-11 sm:text-10 font-semibold">
                {activeWorkspace.name}
              </h1>
              <div className="flex gap-x-2 items-center">
                <h1 className="4xl:text-13 3xl:text-12 2xl:text-[11.5px] xl:text-11 lg:text-[10.5px] md:text-10 sm:text-[9px] text-gray-500 font-semibold">
                  #{activeWorkspace.space_id}
                </h1>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <h1 className="4xl:text-13 3xl:text-12 2xl:text-[11.5px] xl:text-11 lg:text-[10.5px] md:text-10 sm:text-[9px] text-gray-500 font-semibold">
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
        {workspaces && workspaces.length > 1 ? (
          <div className="flex flex-col gap-y-3">
            {workspaces.map((workspace) =>
              getTrue(workspace.active) ? (
                ""
              ) : (
                <div
                  className={`flex items-center whitespace-nowrap gap-x-3  ${
                    darkMode == "dark" ? "hover:bg-myblack" : "hover:bg-gray-100"
                  } rounded-xl  cursor-pointer`}
                  onClick={() => switchWorkspaceFunction(activeWorkspace.id, workspace.id)}
                >
                  {workspace.owner.profile.avatar ? (
                    <img
                      src={`http://127.0.0.1:8000/${workspace.owner.profile.avatar}`}
                      className="4xl:w-11 4xl:h-11 3xl:w-10 3xl:h-10 2xl:w-[38px] 2xl:h-[38px] xl:w-[34px] xl:h-[34px] lg:w-8 lg:h-8 md:w-[30px] md:h-[30px] sm:w-[28px] sm:h-[28px] rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="4xl:w-11 4xl:h-11 3xl:w-10 3xl:h-10 2xl:w-[38px] 2xl:h-[38px] xl:w-[34px] xl:h-[34px] lg:w-8 lg:h-8 md:w-[30px] md:h-[30px] sm:w-[28px] sm:h-[28px]" />
                  )}

                  <div>
                    <h1 className="4xl:text-14 3xl:text-13 2xl:text-[12.4px] xl:text-[12px] lg:text-[11.5px] md:text-11 sm:text-10 font-semibold">
                      {workspace.name}
                    </h1>
                    <div className="flex gap-x-2 items-center">
                      <h1 className="4xl:text-13 3xl:text-12 2xl:text-[11.5px] xl:text-11 lg:text-[10.5px] md:text-10 sm:text-[9px] text-gray-500 font-semibold">
                        #{workspace.space_id}
                      </h1>
                      <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                      <h1 className="4xl:text-13 3xl:text-12 2xl:text-[11.5px] xl:text-11 lg:text-[10.5px] md:text-10 sm:text-[9px] text-gray-500 font-semibold">
                        {workspace.team.members.length}{" "}
                        {workspace.team.members.length > 1 ? "Members" : "Member"}
                      </h1>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className=" border-t-1 border-gray-200 -mx-5"></div>
      <div className="flex flex-col 4xl:gap-y-5 3xl:gap-y-5 2xl:gap-y-5 xl:gap-y-5 lg:gap-y-[14px] md:gap-y-3 sm:gap-y-2">
        <div
          className="flex gap-x-2 items-center  cursor-pointer"
          onClick={() => setShowProfile(true)}
        >
          <FaRegUserCircle className="4xl:w-[22px] 4xl:h-[22px] 3xl:w-5 3xl:h-5 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[15px] lg:h-[15px] md:h-[14px] md:w-[14px] sm:w-[13px] sm:h-[13px]" />
          <h1 className="4xl:text-[16px] 3xl:text-[14px] 2xl:text-[13px] xl:text-[12.5px] lg:text-[12.5px] md:text-12 sm:text-11 font-semibold">
            Profile
          </h1>
        </div>
        <div
          className="flex gap-x-2 items-center cursor-pointer"
          onClick={() => setShowInbox(true)}
        >
          <IoMailOutline className="4xl:w-[22px] 4xl:h-[22px] 3xl:w-5 3xl:h-5 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[15px] lg:h-[15px] md:h-[14px] md:w-[14px] sm:w-[13px] sm:h-[13px]" />
          <h1 className="4xl:text-[16px] 3xl:text-[14px] 2xl:text-[13px] xl:text-[12.5px] lg:text-[12.5px] md:text-12 sm:text-11 font-semibold">
            Inbox
          </h1>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <IoMoonOutline className="4xl:w-[22px] 4xl:h-[22px] 3xl:w-5 3xl:h-5 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[15px] lg:h-[15px] md:h-[14px] md:w-[14px] sm:w-[13px] sm:h-[13px]" />
            <h1 className="4xl:text-[16px] 3xl:text-[14px] 2xl:text-[13px] xl:text-[12.5px] lg:text-[12.5px] md:text-12 sm:text-11 font-semibold">
              Dark
            </h1>
          </div>
          <Switch
            checked={darkMode == "dark" ? true : false}
            onChange={(e) => {
              localStorage.setItem("toggle_Dark_mode", e ? "dark" : "light");
              setDarkMode((prev) => (prev == "dark" ? "light" : "dark"));
            }}
            className={`4xl:w-11 4xl:h-[22px] 3xl:w-10 3xl:h-[20px] 2xl:w-[38px] 2xl:h-[18px] xl:w-[38px] xl:h-[18px] lg:w-[36px] lg:h-[18px] md:w-[34px] md:h-[17px] sm:w-[30px] sm:h-[15px] ${
              darkMode == "dark" ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                darkMode == "dark"
                  ? "3xl:translate-x-6 2xl:translate-x-[19px] xl:translate-x-[19px] lg:translate-x-[17px] md:translate-x-[15px] sm:translate-x-[13px]"
                  : "translate-x-1"
              } inline-block 3xl:w-4 3xl:h-4 2xl:w-[14px] 2xl:h-[14px] xl:w-[13px] xl:h-[13px] lg:w-[12px] lg:h-[12px] md:w-[11px] md:h-[11px] sm:w-[10px] sm:h-[10px] transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
        <div
          className="flex gap-x-2 items-center cursor-pointer"
          onClick={() => setShowCreateWorkspace(true)}
        >
          <GoPlus className="4xl:w-[22px] 4xl:h-[22px] 3xl:w-5 3xl:h-5 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[15px] lg:h-[15px] md:h-[14px] md:w-[14px] sm:w-[13px] sm:h-[13px]" />
          <h1 className="4xl:text-[16px] 3xl:text-[14px] 2xl:text-[13px] xl:text-[12.5px] lg:text-[12.5px] md:text-12 sm:text-11 font-semibold">
            New Workspace
          </h1>
        </div>

        <div className="flex gap-x-2 items-center cursor-pointer" onClick={(e) => handlelogout(e)}>
          <MdLogout className="4xl:w-[22px] 4xl:h-[22px] 3xl:w-5 3xl:h-5 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[15px] lg:h-[15px] md:h-[14px] md:w-[14px] sm:w-[13px] sm:h-[13px]" />
          <h1 className="4xl:text-[16px] 3xl:text-[14px] 2xl:text-[13px] xl:text-[12.5px] lg:text-[12.5px] md:text-12 sm:text-11 font-semibold">
            Log Out
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
