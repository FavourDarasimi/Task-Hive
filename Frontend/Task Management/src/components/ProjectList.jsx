import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaTasks, FaUserCircle } from "react-icons/fa";
import EditProject from "./EditProject";
import { PiStarThin as StarOutline } from "react-icons/pi";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
const ProjectList = ({
  project,
  showMenu,
  setShowMenu,
  setDelete,
  showEdit,
  setShowEdit,
  setAddedToFavorite,
  addedToFavorite,
}) => {
  const { getDate, darkMode, deleteProject, username, addToFavourite } = useContext(Context);

  const delProject = async (id) => {
    try {
      const response = await deleteProject(id);
      setDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  const addFavourite = async (fav) => {
    try {
      const response = await addToFavourite(project.id, fav);
      setAddedToFavorite(!addedToFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className={` ${
          darkMode == "dark" ? "bg-myblack2" : "bg-white"
        } 3xl:px-5 3xl:py-3 2xl:px-4 2xl:py-2 xl:p-3 sm:p-2 rounded-xl  flex flex-col`}
      >
        {showEdit ? <EditProject project={project} setShowEdit={setShowEdit} /> : ""}
        <div className="flex justify-between items-center">
          <h1
            className={` ${
              darkMode == "dark" ? "text-anti-flash-white" : ""
            } 3xl:text-[16.5px] 4xl:text-[18px] w-70% 2xl:text-16 xl:text-15 lg:text-14 md:text-12 sm:text-10 font-semibold truncate  `}
          >
            {project.name}
          </h1>
          <div className="flex items-center">
            {project.favourite == true ? (
              <StarSolid
                className="text-yellow-400 3xl:w-5 3xl:h-5 2xl:w-5 2xl:h-5 xl:w-5 xl:h-5 lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-3 sm:h-3  cursor-pointer"
                onClick={() => addFavourite(false)}
              />
            ) : (
              <StarOutline
                className="3xl:w-5 3xl:h-5 2xl:w-5 2xl:h-5 xl:w-5 xl:h-5 lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-3 sm:h-3  text-gray-400  cursor-pointer"
                onClick={() => addFavourite(true)}
              />
            )}
            {project.user.username == username ? (
              <div className="">
                <button
                  onClick={() => (showMenu == project.id ? setShowMenu() : setShowMenu(project.id))}
                >
                  <HiOutlineDotsVertical className="3xl:w-5 3xl:h-5 mt-1 2xl:w-5 2xl:h-5 xl:w-4 xl:h-4 lg:w-[13px] lg:h-[13px] md:w-[13px] md:h-[13px] sm:w-3 sm:h-3" />
                </button>

                <div
                  className={`${
                    darkMode == "dark" ? "bg-myblack" : "bg-white"
                  }  shadow-2xl py-2 absolute rounded-lg flex flex-col gap-y-3 font-semibold  ${
                    showMenu == project.id ? "block" : "hidden"
                  }`}
                >
                  <div
                    className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white"
                    onClick={() => setShowEdit(true)}
                  >
                    <MdEdit />
                    <h1 className="">Edit</h1>
                  </div>
                  <div
                    className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-red-600 hover:rounded-lg  hover:text-white"
                    onClick={() => delProject(project.id)}
                  >
                    <MdDelete />
                    <h1 className="">Delete</h1>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <p className="3xl:text-13 4xl:text-[14px] 2xl:text-12 xl:text-11 lg:text-10 md:text-[9px] md:pt-1 sm:text-[8px] text-gray-400 pl-2 3xl:pt-1 sm:-mt-[4px]">
          {getDate(project.created_at)}
        </p>

        <div className="3xl:pt-3 sm:pt-2 flex 3xl:gap-x-5 2xl:gap-x-4 sm:gap-x-1 items-center">
          <div className="flex justify-end  3xl:text-18 4xl:text-19 2xl:text-18 xl:text-16 lg:text-15 md:text-14 sm:text-[9px] font-semibold sm:font-bold">
            <h1>{project.percentage}%</h1>
          </div>
          <svg
            height={10}
            className="w-100% 3xl:stroke-[4] 2xl:stroke-[4] xl:stroke-[3] lg:stroke-[3] md:stroke-[3]  sm:stroke-[2]"
          >
            <line x1="0" y1={10 / 2} x2={370} y2={10 / 2} stroke="#f0f0f0" strokeLinecap="round" />
            <line
              x1="0"
              y1={10 / 2}
              x2={`${(project.percentage / 100) * 100}%`}
              style={{ width: `${project.percentage}%` }}
              y2={10 / 2}
              stroke={`${
                project.percentage <= 40
                  ? "#dc2626"
                  : project.percentage <= 70
                  ? "#ca8a04"
                  : project.percentage <= 99
                  ? "#2563eb"
                  : "#16a34a"
              }`}
            />
          </svg>
        </div>

        <div className="flex items-center 3xl:-space-x-3 sm:-space-x-2 3xl:pt-1 sm:pt-[2px] ">
          {project.assigned_members.map((member, index) =>
            index >= 4 ? (
              index == 4 ? (
                <h1
                  key={member.id}
                  className={`bg-anti-flash-white  3xl:text-19 font-bold  3xl:w-[44px] 3xl:h-[44px] 4xl:w-[48px] 4xl:h-[48px] 2xl:w-[42px] 2xl:h-[42px] xl:w-[40px] xl:h-[40px] lg:w-[38px] lg:h-[38px] md:w-[36px] md:h-[36px] sm:w-6 sm:h-6 sm:text-10 border-2 rounded-full flex items-center justify-center ${
                    darkMode == "dark" ? "text-black border-myblack" : "border-white"
                  }`}
                >
                  {" "}
                  +{project.assigned_members.length - index}
                </h1>
              ) : (
                ""
              )
            ) : member.profile.avatar ? (
              <img
                key={member.id}
                src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                className={`3xl:w-[44px] 3xl:h-[44px] 4xl:w-[48px] 4xl:h-[48px] 2xl:w-[42px] 2xl:h-[42px] xl:w-[40px] xl:h-[40px] lg:w-[38px] lg:h-[38px]  md:w-[36px] md:h-[36px] sm:w-6 sm:h-6 rounded-full  border-2 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            ) : (
              <FaUserCircle
                key={member.id}
                className={`3xl:w-[44px] 3xl:h-[44px] 4xl:w-[48px] 4xl:h-[48px] 2xl:w-[42px] 2xl:h-[42px] xl:w-[40px] xl:h-[40px] lg:w-[38px] lg:h-[38px]  md:w-[36px] md:h-[36px] sm:w-6 sm:h-6 rounded-full  border-2 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            )
          )}
        </div>

        <div className="flex justify-end  ">
          <div className="flex  items-center  text-blue-500 3xl:text-13 4xl:text-14 2xl:text-13 xl:text-12 lg:text-11 md:text-10 sm:text-10 font-semibold">
            <Link to={`/project/${project.id}`}>
              <h1>View</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
