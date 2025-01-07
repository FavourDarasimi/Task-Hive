import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import { FaUserCircle } from "react-icons/fa";
import EditTask from "./EditTask";

const TaskList = ({ task, showEdit, setShowEdit }) => {
  const { getDate, getRandomColor, getFirstLetter, darkMode } = useContext(Context);

  return (
    <div
      className={`${
        darkMode == "dark" ? "bg-myblack2" : "bg-white"
      } p-4 flex flex-col  rounded-2xl `}
    >
      {showEdit ? <EditTask task={task} setShowEdit={setShowEdit} /> : ""}

      <div className="flex justify-between items-start">
        <div className="flex gap-x-2 items-center">
          <div
            className={` lg:h-4 lg:w-4 sm:w-3 sm:h-3 rounded-full ${
              task.status == "Completed"
                ? "bg-green-600"
                : task.status == "Pending"
                ? "bg-red-600"
                : "bg-yellow-600"
            }`}
          ></div>
          <h1 className="lg:text-xl sm:text-14 font-semibold">{task.title}</h1>
        </div>
        <div>
          {task.is_due ? (
            <h1 className="text-13 bg-red-200 text-red-600 font-semibold py-1 px-2 rounded-full">
              Missed Deadline{" "}
            </h1>
          ) : (
            ""
          )}
        </div>
      </div>
      <h1
        className={`lg:text-15  sm:text-13 font-semibold pl-6 ${
          task.priority == "High"
            ? "text-red-600"
            : task.priority == "Medium"
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        {task.priority}
      </h1>
      <div className="flex items-center gap-x-2 lg:text-16 sm:text-13 py-4 ">
        <h1 className="font-semibold">Deadline Date:</h1>
        <h1 className="text-14">{getDate(task.due_date)}</h1>
      </div>
      <div className="flex lg:text-16 sm:text-13 justify-between items-center lg:pb-2 sm:pb-1">
        <div className="flex -space-x-2 ">
          {task.assigned_members.map((member, index) => (
            <div key={member.id}>
              {index >= 3 ? (
                index == 3 ? (
                  <div
                    className={`bg-anti-flash-white text-17 font-bold  w-[50px] h-[50px] shadow-2xl rounded-full border-4 flex items-center justify-center ${
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
                  src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                  className={`lg:w-12 lg:h-12 md:w-4 md:h-4 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                    darkMode == "dark" ? "border-myblack" : "border-white"
                  }`}
                />
              ) : (
                <FaUserCircle
                  className={`lg:w-12 lg:h-12 md:w-4 md:h-4 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                    darkMode == "dark" ? "border-myblack" : "border-white"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <h1 className="lg:text-15 sm:text-13">{getDate(task.created_at)}</h1>
      </div>
    </div>
  );
};

export default TaskList;
