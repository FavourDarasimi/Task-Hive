import React, { useContext } from "react";
import { Context } from "../context/Context";
import { FaInfoCircle } from "react-icons/fa";

const ProjectPercentage = ({
  radius,
  circumference,
  offset,
  project,
  completedTasks,
  tasks,
  ongoingTasks,
}) => {
  const { darkMode } = useContext(Context);
  return (
    <div className="parent w-[288px]">
      <div
        className={`bg-blue-500 text-white relative ${
          darkMode == "dark" ? "" : ""
        } rounded-t-xl  px-14 pb-10 pt-5`}
      >
        <h1 className="text-center font-semibold text-xl">Project Stats</h1>
        <div className="">
          <div className="relative w-44 h-44">
            <svg className="" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} fill="none" stroke="#ddd" strokeWidth="11" />
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="white"
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold ">
              <h1 className="text-2xl ">{project.percentage}%</h1>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-between -mx-4 ">
          <div>
            <div className="flex gap-x-2 items-center">
              <div className="w-[7px] h-[7px] bg-white rounded-full"></div>
              <h1 className="text-14 font-semibold">Completed</h1>
            </div>
            <h1 className="text-center text-17 ">
              {completedTasks.length} {completedTasks.length > 1 ? "tasks" : "task"}
            </h1>
          </div>
          <div>
            <div className="flex gap-x-2 items-center">
              <div className="w-[7px] h-[7px] bg-white rounded-full"></div>
              <h1 className="text-14 font-semibold">In Progess</h1>
            </div>
            <h1 className="text-center text-17 ">
              {ongoingTasks.length} {ongoingTasks.length > 1 ? "tasks" : "task"}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex gap-x-3 items-center rounded-b-xl bg-gray-200 px-5 py-3 child w-full">
        <FaInfoCircle className="w-12 h-12" />
        <h1 className=" text-14">
          You have completed {project.percentage}% of the tasks in this Project
        </h1>
      </div>
    </div>
  );
};

export default ProjectPercentage;
