import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import Spinner from "../assets/Iphone-spinner-2.gif";
import { Link } from "react-router";
import axios from "axios";
import Task from "../pages/Task";

const TaskList = ({ tasks }) => {
  const { getDate, getRandomColor, getFirstLetter, darkMode } = useContext(Context);

  const colors = ["red", "green", "yellow", "blue", "indigo", "purple", "pink"];
  const shades = [400, 500, 600, 700, 800];

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 pt-10 gap-x-10 gap-y-5">
      {tasks ? (
        tasks.map((task) => (
          <div
            className={`${
              darkMode == "dark" ? "bg-myblack2" : "bg-white"
            } p-4 flex flex-col lg::gap-y-5 sm:gap-y-2 rounded-lg `}
          >
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
            <h1
              className={`lg:text-17 sm:text-13 font-semibold ${
                task.priority == "High"
                  ? "text-red-600"
                  : task.priority == "Medium"
                  ? "text-yellow-00"
                  : "text-green-600"
              }`}
            >
              {task.priority}
            </h1>
            <div
              className={`flex justify-between lg:text-16 sm:text-13 border-b-1 ${
                darkMode == "dark" ? "border-myblack" : "border-mygrey"
              } pb-2`}
            >
              <h1>Deadline Date:</h1>
              <h1>{getDate(task.due_date)}</h1>
            </div>
            <div
              className={`flex lg:text-16 sm:text-13 justify-between border-b-1 ${
                darkMode == "dark" ? "border-myblack" : "border-mygrey"
              } lg:pb-2 sm:pb-1`}
            >
              <h1>Task Team</h1>
              <div className="flex -space-x-2 w-28">
                {task.assigned_members.map((member) => (
                  <div
                    style={{ backgroundColor: getRandomColor() }}
                    className={` rounded-full lg:h-7 lg:w-7 sm:w-6 sm:h-6 lg:text-16 sm:text-13  text-white text-13 flex items-center justify-center border-2 ${
                      darkMode == "dark" ? "border-myblack" : "border-mygrey"
                    }`}
                  >
                    {getFirstLetter(member.username)}
                  </div>
                ))}
              </div>
            </div>
            <h1 className="lg:text-16 sm:text-13">{getDate(task.created_at)}</h1>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center bg-anti-flash-white bg-blend-screen">
          <img src={Spinner} />
        </div>
      )}
    </div>
  );
};

export default TaskList;
