import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaTasks, FaUserCircle } from "react-icons/fa";
import EditProject from "./EditProject";
const ProjectList = ({ project, showMenu, setShowMenu, setDelete, showEdit, setShowEdit }) => {
  const { getDate, darkMode, deleteProject } = useContext(Context);

  const delProject = async (id) => {
    try {
      const response = await deleteProject(id);
      setDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className={` ${
          darkMode == "dark" ? "bg-myblack2" : "bg-white"
        } lg:p-5 sm:p-3 rounded-xl  flex flex-col`}
      >
        {showEdit ? <EditProject project={project} setShowEdit={setShowEdit} /> : ""}
        <div className="flex justify-between items-center">
          <h1
            className={` ${
              darkMode == "dark" ? "text-anti-flash-white" : ""
            } lg:text-xl sm:text-16 font-bold   `}
          >
            {project.name}
          </h1>

          <div className="">
            <button
              onClick={() => (showMenu == project.id ? setShowMenu() : setShowMenu(project.id))}
            >
              <HiOutlineDotsVertical className="w-5 h-5" />
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
        </div>
        <p className="lg:text-14 sm:text-xs text-gray-400 pl-2 pt-1">
          {getDate(project.created_at)}
        </p>

        <div className="lg:pt-10 sm:pt-4 flex gap-x-5 items-center">
          <div className="flex justify-end pt-1 lg:text-xl sm:text-xs font-semibold">
            <h1>{project.percentage}%</h1>
          </div>
          <svg height={10} className="w-100%">
            <line
              x1="0"
              y1={10 / 2}
              x2={370}
              y2={10 / 2}
              stroke="#f0f0f0"
              strokeWidth={4}
              strokeLinecap="round"
            />
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
              strokeWidth={4}
            />
          </svg>
        </div>

        <div className="flex -space-x-2 pt-1">
          {project.assigned_members.map((member) => (
            <div key={member.id}>
              {member.profile.avatar ? (
                <img
                  src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                  className={`lg:w-12 lg:h-12 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                    darkMode == "dark" ? "border-myblack" : "border-white"
                  }`}
                />
              ) : (
                <FaUserCircle
                  className={`lg:w-12 lg:h-12 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                    darkMode == "dark" ? "border-myblack" : "border-white"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between lg:pt-5 sm:pt-2">
          <div className="flex gap-x-3 items-center">
            <div className="flex gap-x-1 items-center">
              <HiOutlineUsers />
              <h1 className=" lg:text-14 sm:text-xs ">
                {project.assigned_members ? project.assigned_members.length : "0"}
              </h1>
            </div>
            <div className="flex gap-x-1 items-center">
              <FaTasks />
              <h1 className="lg:text-14 sm:text-xs">{project.task.length}</h1>
            </div>
          </div>
          <div className="flex  items-center  text-blue-500 lg:text-15 sm:text-13 font-semibold">
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
