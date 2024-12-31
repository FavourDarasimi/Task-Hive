import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineAddToPhotos, MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiGreaterThan } from "react-icons/pi";
import { FaTasks } from "react-icons/fa";
import AddTask from "../components/AddTask";
const ProjectList = ({ project, showMenu, setShowMenu, showTask, setShowTask }) => {
  const { getDate, darkMode } = useContext(Context);
  const [numOfTasks, setNumOfTasks] = useState(7);
  const [projectid, setProjectid] = useState(null);
  const handleClick = (id) => {
    console.log(id);
    setProjectid(id);
    setShowTask(true);
  };

  return (
    <div>
      <div
        className={` ${
          darkMode == "dark" ? "bg-myblack2" : "bg-white"
        } lg:p-5 sm:p-3 rounded-xl  flex flex-col`}
      >
        {showTask && projectid ? <AddTask projectid={projectid} setShow={setShowTask} /> : ""}
        <div className="flex justify-between items-center h-14">
          <h1
            className={` ${
              darkMode == "dark" ? "text-anti-flash-white" : ""
            } lg:text-xl sm:text-16 font-semibold lg:w-52 sm:w-44  `}
          >
            {project.name}
          </h1>

          <div className="flex gap-x-2">
            <h1
              className={`sm:text-xs lg:text-14 py-1 px-2 font-bold rounded-full whitespace-nowrap  ${
                project.status == "Completed" ? " text-green-500 " : " text-yellow-500 "
              }`}
            >
              {project.status}
            </h1>
            <button
              onClick={() => (showMenu == project.id ? setShowMenu() : setShowMenu(project.id))}
            >
              <HiOutlineDotsVertical className="w-5 h-5" />
            </button>

            <div
              className={`${
                darkMode == "dark" ? "bg-myblack" : "bg-white"
              }  shadow-2xl py-2 absolute rounded-lg flex flex-col gap-y-3 font-semibold mt-7 ${
                showMenu == project.id ? "block" : "hidden"
              }`}
            >
              <div className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white">
                <MdEdit />
                <h1 className="">Edit</h1>
              </div>
              <div className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white">
                <MdDelete />
                <h1 className="">Delete</h1>
              </div>
            </div>
          </div>
        </div>
        <p className="lg:text-14 sm:text-xs text-gray-400 lg:pt-3 sm:pt-1 ">
          {getDate(project.created_at)}
        </p>
        {/* {project.task.length > 0 ? (
          <div className="ml-10 pt-2 text-gray-400 text-15 h-44">
            <h1 className="text-17 text-black font-semibold">Tasks</h1>
            <ul className="list-disc">
              {project.task.slice(0, 6).map((tasks) => (
                <li>{tasks.title}</li>
              ))}
              {6 < project.task.length && (
                <p className="text-gray-500 font-semibold">{project.task.length - 6} more</p>
              )}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-44 text-gray-400 ">
            <MdOutlineAddToPhotos
              className="w-7 h-7 hover:text-black cursor-pointer"
              onClick={() => handleClick(project.id)}
            />
            <p>New Task</p>
          </div>
        )} */}

        <div className="lg:pt-10 sm:pt-4">
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
              stroke="#2563eb"
              strokeWidth={5}
            />
          </svg>
          <div className="flex justify-end pt-1 lg:text-14 sm:text-xs text-gray-400">
            <h1>{project.percentage}%</h1>
          </div>
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
