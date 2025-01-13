import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import AssignMembersToTask from "./AssignMembersToTask";
import { MdDelete, MdEdit, MdOutlineAlarmAdd, MdError } from "react-icons/md";
const ProjectTaskMenu = ({
  project,
  task,
  showMenu,
  userInMembers,
  openAdd,
  setOpenAdd,
  setParam,
  param,
  searchedMembers,
  selectedMembers,
  selectedMembersId,
  remove,
  removeSelectedUser,
  cancel,
  setShowEdit,
  delTask,
  update,
  setUpdate,
  dueDate,
  setDueDate,
  updDueDate,
  setAddedUser,
}) => {
  const { username, darkMode } = useContext(Context);
  return (
    <div
      className={`${
        darkMode == "dark" ? "bg-myblack" : "bg-white"
      }  shadow-2xl z-1 py-2 absolute rounded-lg flex flex-col gap-y-1 font-semibold  ${
        showMenu == task.id ? "block" : "hidden"
      }`}
    >
      {project.name != "Personal Tasks" &&
      !task.is_due &&
      (userInMembers(task.assigned_members) || project.user.username == username) &&
      !task.completed ? (
        <div>
          <div
            className={`flex gap-x-1 relative items-center pl-2 py-1 pr-5 cursor-pointer hover:bg-green-600 hover:rounded-lg  hover:text-white ${
              openAdd ? "bg-green-600 text-white rounded-lg" : ""
            }`}
            onClick={() => {
              openAdd == task.id ? setOpenAdd() : setOpenAdd(task.id);
            }}
          >
            <FaPlus className="w-3 h-3" />
            <h1 className="text-14">Add</h1>
          </div>
          {openAdd == task.id ? (
            <AssignMembersToTask
              setParam={setParam}
              param={param}
              task={task}
              searchedMembers={searchedMembers}
              selectedMembers={selectedMembers}
              selectedMembersId={selectedMembersId}
              remove={remove}
              removeSelectedUser={removeSelectedUser}
              cancel={cancel}
              setAddedUser={setAddedUser}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {task.is_due ? (
        ""
      ) : (
        <div
          className="flex gap-x-1 items-center pl-2 py-1 pr-5 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white"
          onClick={() => setShowEdit(task.id)}
        >
          <MdEdit className="w-3 h-3" />
          <h1 className="text-14">Edit</h1>
        </div>
      )}

      <div
        className="flex gap-x-1 items-center pl-2 py-1 pr-5 cursor-pointer hover:bg-red-600 hover:rounded-lg  hover:text-white"
        onClick={() => delTask(task.id)}
      >
        <MdDelete className="w-3 h-3" />
        <h1 className="text-14">Delete</h1>
      </div>

      {(task.is_due && userInMembers(task.assigned_members)) ||
      (task.is_due && project.user.username == username) ? (
        <div>
          <div
            className={`flex gap-x-1 relative items-center pl-2 py-1 pr-5 cursor-pointer hover:bg-green-600 hover:rounded-lg  hover:text-white ${
              update == task.id ? "bg-green-600 rounded-lg text-white" : ""
            }`}
            onClick={() => (update == task.id ? setUpdate() : setUpdate(task.id))}
          >
            <MdOutlineAlarmAdd className="w-3 h-3" />
            <h1 className="text-14 whitespace-nowrap">New Deadline</h1>
          </div>
          {update == task.id ? (
            <div className="absolute right-0 mt-5 bg-white shadow-2xl p-3 rounded-xl">
              <input
                type="date"
                value={dueDate || task.due_date}
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full bg-anti-flash-white lg:h-10 sm:h-11 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Due Date"
                onChange={(e) => setDueDate(e.target.value)}
              />
              <div className="w-full flex justify-center">
                <button
                  className="bg-blue-600 p-1 text-white text-14 rounded-md mt-2 "
                  onClick={() => updDueDate(task.id)}
                >
                  Change
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectTaskMenu;
