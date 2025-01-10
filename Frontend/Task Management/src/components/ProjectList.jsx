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
        } lg:px-5 lg:py-3 sm:p-2 rounded-xl  flex flex-col`}
      >
        {showEdit ? <EditProject project={project} setShowEdit={setShowEdit} /> : ""}
        <div className="flex justify-between items-center">
          <h1
            className={` ${
              darkMode == "dark" ? "text-anti-flash-white" : ""
            } lg:text-18 sm:text-10 font-bold   `}
          >
            {project.name}
          </h1>
          <div className="flex items-center">
            {project.favourite == true ? (
              <StarSolid
                className="text-yellow-400 lg:w-5 lg:h-5 sm:w-3 sm:h-3 mb-2 cursor-pointer"
                onClick={() => addFavourite(false)}
              />
            ) : (
              <StarOutline
                className="lg:w-5 lg:h-5 sm:w-3 sm:h-3 mb-2 text-gray-400  cursor-pointer"
                onClick={() => addFavourite(true)}
              />
            )}
            {project.user.username == username ? (
              <div className="">
                <button
                  onClick={() => (showMenu == project.id ? setShowMenu() : setShowMenu(project.id))}
                >
                  <HiOutlineDotsVertical className="lg:w-5 lg:h-5 sm:w-3 sm:h-3" />
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
        <p className="lg:text-13 sm:text-[8px] text-gray-400 pl-2 lg:pt-1 sm:-mt-[4px]">
          {getDate(project.created_at)}
        </p>

        <div className="lg:pt-5 sm:pt-2 flex lg:gap-x-5 sm:gap-x-1 items-center">
          <div className="flex justify-end  lg:text-18 sm:text-[9px] font-semibold sm:font-bold">
            <h1>{project.percentage}%</h1>
          </div>
          <svg height={10} className="w-100% lg:stroke-[4] sm:stroke-[2]">
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

        <div className="flex items-center lg:-space-x-3 sm:-space-x-2 lg:pt-1 sm:pt-[2px] ">
          {project.assigned_members.map((member, index) =>
            index >= 4 ? (
              index == 4 ? (
                <h1
                  key={member.id}
                  className={`bg-anti-flash-white  lg:text-19 font-bold  lg:w-[48px] lg:h-[48px] sm:w-6 sm:h-6 sm:text-10 border-2 rounded-full flex items-center justify-center ${
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
                className={`lg:w-[48px] lg:h-[48px] md:w-44 md:h-44 sm:w-6 sm:h-6 rounded-full  border-2 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            ) : (
              <FaUserCircle
                key={member.id}
                className={`lg:w-[48px] lg:h-[48px] md:w-44 md:h-44 sm:w-6 sm:h-6 rounded-full  border-2 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            )
          )}
        </div>

        <div className="flex justify-end  sm:pt-2">
          <div className="flex  items-center  text-blue-500 lg:text-15 sm:text-10 font-semibold">
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
