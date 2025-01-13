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
      } 3xl:p-4 2xl:p-4 sm:p-[10px] flex flex-col  rounded-2xl `}
    >
      {showEdit ? <EditTask task={task} setShowEdit={setShowEdit} /> : ""}

      <div className="flex justify-between items-start">
        <div className="flex 3xl:gap-x-2 sm:gap-x-1 items-center w-70% ">
          <div
            className={` 3xl:h-3 3xl:w-3 sm:w-2 sm:h-2 rounded-full ${
              task.status == "Completed"
                ? "bg-green-600"
                : task.status == "Pending"
                ? "bg-red-600"
                : "bg-yellow-600"
            }`}
          ></div>
          <h1 className="3xl:text-[16.5px] 4xl:text-[18px] 2xl:text-16 xl:text-15 lg:text-14 md:text-12 sm:text-10 font-semibold truncate">
            {task.title}
          </h1>
        </div>
        <div className="flex items-center">
          {task.is_due ? (
            <MdError className="text-red-600 3xl:w-5 3xl:h-5 2xl:w-[18px] 2xl:h-[18px] xl:w-[17px] xl:h-[17px] lg:w-[16px] lg:h-[16px] md:h-[15px] md:w-[15px] sm:w-[13px] sm:h-[13px]" />
          ) : (
            ""
          )}
          <div className="">
            <HiOutlineDotsVertical
              onClick={() => (showMenu == task.id ? setShowMenu() : setShowMenu(task.id))}
              className="4xl:w-5 4xl:h-5 3xl:w-5 3xl:h-5 2xl:w-[17px] 2xl:h-[17px] xl:w-4 xl:h-4 lg:w-[15px] lg:h-[15px] md:w-[13px] md:h-[13px] sm:w-[10px] sm:h-[10px] "
            />

            <div
              className={`${
                darkMode == "dark" ? "bg-myblack" : "bg-white"
              }  shadow-2xl py-2 absolute rounded-lg flex flex-col gap-y-1 font-semibold  ${
                showMenu == task.id ? "block" : "hidden"
              }`}
            >
              <div
                className="flex gap-x-1 items-center 3xl:pl-2 2xl:pl-2 xl:pl-2 lg:pl-2 md:pl-[6px] py-1 3xl:pr-8 2xl:pr-7 xl:pr-6 lg:pr-5 md:pr-[18px] sm:pr-4 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white"
                onClick={() => setShowEdit(task.id)}
              >
                <MdEdit className="3xl:w-4 3xl:h-4 2xl:w-4 2xl:h-4 xl:w-[15px] xl:h-[15px] lg:w-[14px] lg:h-[14px] md:w-[13px] md:h-[13px] sm:w-[11px] sm:h-[11px]" />
                <h1 className="3xl:text-16 2xl:text-16 xl:text-15 lg:text-14 md:text-13 sm:text-11">
                  Edit
                </h1>
              </div>
              <div
                className="flex gap-x-1 items-center 3xl:pl-2 2xl:pl-2 xl:pl-2 lg:pl-2 md:pl-[6px] py-1 3xl:pr-8 2xl:pr-7 xl:pr-6 lg:pr-5 md:pr-[18px] sm:pr-4 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white"
                onClick={() => delTask(task.id)}
              >
                <MdDelete className="3xl:w-4 3xl:h-4 2xl:w-4 2xl:h-4 xl:w-[15px] xl:h-[15px] lg:w-[14px] lg:h-[14px] md:w-[13px] md:h-[13px] sm:w-[11px] sm:h-[11px]" />
                <h1 className="3xl:text-16 2xl:text-16 xl:text-15 lg:text-14 md:text-13 sm:text-11">
                  Delete
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1
        className={`4xl:text-16 3xl:text-14 2xl:text-[13.5px] xl:text-13 lg:text-12 md:text-12 sm:text-10 font-semibold 3xl:pl-6 sm:pl-3 ${
          task.priority == "High"
            ? "text-red-600"
            : task.priority == "Medium"
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        {task.priority}
      </h1>
      <div className="flex items-center 3xl:gap-x-2 2xl:gap-x-2 sm:gap-x-[2px]  3xl:py-4 sm:py-[2px]">
        <h1 className="font-semibold 4xl:text-17 3xl:text-15 2xl:text-14 xl:text-13 lg:text-12 md:text-12 sm:text-10">
          Deadline:
        </h1>
        <h1 className="4xl:text-15 3xl:text-13 2xl:text-12 xl:text-12 lg:text-12 md:text-11 sm:text-[9px] whitespace-nowrap truncate">
          {getDate(task.due_date)}
        </h1>
      </div>
      <div className="flex 3xl:text-16 sm:text-13 justify-between items-center ">
        <div className="flex -space-x-2 ">
          {task.assigned_members.map((member, index) =>
            index >= 3 ? (
              index == 3 ? (
                <div
                  key={member.id}
                  className={`bg-anti-flash-white 3xl:text-17 sm:text-10 font-bold  3xl:w-[44px] 3xl:h-[44px] 4xl:w-[48px] 4xl:h-[48px] 2xl:w-[42px] 2xl:h-[42px] xl:w-[40px] xl:h-[40px] lg:w-[38px] lg:h-[38px]  md:w-[36px] md:h-[36px] sm:w-6 sm:h-6 shadow-2xl rounded-full border-1 flex items-center justify-center ${
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
                className={`3xl:w-[44px] 3xl:h-[44px] 4xl:w-[48px] 4xl:h-[48px] 2xl:w-[42px] 2xl:h-[42px] xl:w-[40px] xl:h-[40px] lg:w-[38px] lg:h-[38px]  md:w-[36px] md:h-[36px] sm:w-6 sm:h-6 rounded-full 3xl:ml-3 border-1 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            ) : (
              <FaUserCircle
                key={member.id}
                className={`3xl:w-[44px] 3xl:h-[44px] 4xl:w-[48px] 4xl:h-[48px] 2xl:w-[42px] 2xl:h-[42px] xl:w-[40px] xl:h-[40px] lg:w-[38px] lg:h-[38px]  md:w-[36px] md:h-[36px] sm:w-6 sm:h-6 rounded-full 3xl:ml-3 border-1 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
