import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import { FaUserCircle } from "react-icons/fa";
import EditTask from "./EditTask";
import { MdError, MdDelete, MdEdit } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";

const TaskList = ({ task, showEdit, setShowEdit, showMenu, setShowMenu }) => {
  const { getDate, getRandomColor, getFirstLetter, darkMode, deleteTask } = useContext(Context);

  const delTask = async (id) => {
    try {
      const response = await deleteTask(id);
      setDelete(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        darkMode == "dark" ? "bg-myblack2" : "bg-white"
      } lg:p-4 sm:p-2 flex flex-col  rounded-2xl `}
    >
      {showEdit ? <EditTask task={task} setShowEdit={setShowEdit} /> : ""}

      <div className="flex justify-between items-start">
        <div className="flex lg:gap-x-2 sm:gap-x-1 items-center">
          <div
            className={` lg:h-3 lg:w-3 sm:w-2 sm:h-2 rounded-full ${
              task.status == "Completed"
                ? "bg-green-600"
                : task.status == "Pending"
                ? "bg-red-600"
                : "bg-yellow-600"
            }`}
          ></div>
          <h1 className="lg:text-18 sm:text-10 font-semibold">{task.title}</h1>
        </div>
        <div className="flex">
          {task.is_due ? (
            <MdError className="text-red-600 lg:w-5 lg:h-5 sm:w-[13px] sm:h-[13px]" />
          ) : (
            ""
          )}
          <div className="">
            <button onClick={() => (showMenu == task.id ? setShowMenu() : setShowMenu(task.id))}>
              <HiOutlineDotsVertical className="w-5 h-5" />
            </button>

            <div
              className={`${
                darkMode == "dark" ? "bg-myblack" : "bg-white"
              }  shadow-2xl py-2 absolute rounded-lg flex flex-col gap-y-1 font-semibold  ${
                showMenu == task.id ? "block" : "hidden"
              }`}
            >
              <div
                className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white"
                onClick={() => setShowEdit(task.id)}
              >
                <MdEdit />
                <h1 className="">Edit</h1>
              </div>
              <div
                className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-red-600 hover:rounded-lg  hover:text-white"
                onClick={() => delTask(task.id)}
              >
                <MdDelete />
                <h1 className="">Delete</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1
        className={`lg:text-14  sm:text-10 font-semibold lg:pl-6 sm:pl-3 ${
          task.priority == "High"
            ? "text-red-600"
            : task.priority == "Medium"
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        {task.priority}
      </h1>
      <div className="flex items-center lg:gap-x-2 sm:gap-x-[2px]  lg:py-4 sm:py-2">
        <h1 className="font-semibold lg:text-15 sm:text-10 whitespace-nowrap">Deadline:</h1>
        <h1 className="lg:text-13 sm:text-[9px] whitespace-nowrap">{getDate(task.due_date)}</h1>
      </div>
      <div className="flex lg:text-16 sm:text-13 justify-between items-center lg:pb-2 sm:pb-1">
        <div className="flex -space-x-2 ">
          {task.assigned_members.map((member, index) =>
            index >= 3 ? (
              index == 3 ? (
                <div
                  key={member.id}
                  className={`bg-anti-flash-white lg:text-17 sm:text-10 font-bold  lg:w-10 lg:h-10 sm:w-5 sm:h-5 shadow-2xl rounded-full border-1 flex items-center justify-center ${
                    darkMode == "dark" ? "text-black border-myblack" : "border-white"
                  }`}
                >
                  +{task.assigned_members.length - index}
                </div>
              ) : (
                ""
              )
            ) : member.profile.avatar ? (
              <img
                key={member.id}
                src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                className={`lg:w-10 lg:h-10 md:w-4 md:h-4 sm:w-5 sm:h-5 rounded-full lg:ml-3 border-1 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            ) : (
              <FaUserCircle
                key={member.id}
                className={`lg:w-10 lg:h-10 md:w-4 md:h-4 sm:w-5 sm:h-5 rounded-full lg:ml-3 border-1 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            )
          )}
        </div>
        <h1 className="lg:text-14 sm:text-10 whitespace-nowrap">{getDate(task.created_at)}</h1>
      </div>
    </div>
  );
};

export default TaskList;
