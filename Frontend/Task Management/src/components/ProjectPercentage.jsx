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
    <div className="parent lg:w-[288px] sm:w-52">
      <div
        className={`bg-blue-500 text-white relative ${
          darkMode == "dark" ? "" : ""
        } rounded-t-xl  px-14 pb-10 pt-5`}
      >
        <h1 className="text-center font-semibold lg:text-xl sm:text-14">Project Stats</h1>
        <div className="flex justify-center">
          <div className="relative lg:w-44 lg:h-44 sm:w-20 sm:h-20">
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
              <h1 className="lg:text-2xl sm:text-15">{project.percentage}%</h1>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-between lg:-mx-4 sm:-mx-8 ">
          <div>
            <div className="flex lg:gap-x-2 sm:gap-x-1 items-center">
              <div className="lg:w-[7px] lg:h-[7px] sm:w-[6px] sm:h-[6px] bg-white rounded-full"></div>
              <h1 className="lg:text-14 sm:text-11 font-semibold">Completed</h1>
            </div>
            <h1 className="text-center lg:text-17 sm:text-13">
              {completedTasks.length} {completedTasks.length > 1 ? "tasks" : "task"}
            </h1>
          </div>
          <div>
            <div className="flex lg:gap-x-2 sm:gap-x-1 items-center">
              <div className="lg:w-[7px] lg:h-[7px] sm:w-[6px] sm:h-[6px] bg-white rounded-full"></div>
              <h1 className="lg:text-14 sm:text-11 font-semibold">In Progess</h1>
            </div>
            <h1 className="text-center lg:text-17 sm:text-13">
              {ongoingTasks.length} {ongoingTasks.length > 1 ? "tasks" : "task"}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex gap-x-3 items-center rounded-b-xl bg-gray-200 px-5 py-3 child w-full">
        <FaInfoCircle className="lg:w-12 lg:h-12 sm:w-7 sm:h-7" />
        <h1 className="lg:text-14 sm:text-11">
          You have completed {project.percentage}% of the tasks in this Project
        </h1>
      </div>
    </div>
  );
};

export default ProjectPercentage;
