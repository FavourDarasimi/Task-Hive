import React, { useContext } from "react";
import { Context } from "../context/Context";

const ProjectPercentage = ({ radius, circumference, offset, project, completedTasks, tasks }) => {
  const { darkMode } = useContext(Context);
  return (
    <div
      className={` ${
        darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
      } rounded-xl w-fit px-14 pb-10 pt-5`}
    >
      <h1 className="text-center font-semibold text-2xl mb-10">Task Completed</h1>
      <div className="">
        <div className="relative">
          <svg className="w-44 h-44" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#ddd" strokeWidth="7" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#2563eb"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-600">
            <h1 className="text-3xl text-blue-600">{project.percentage}%</h1>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-18 font-semibold text-center">
          {completedTasks.length} of {tasks.length} Completed
        </h1>
      </div>
    </div>
  );
};

export default ProjectPercentage;
