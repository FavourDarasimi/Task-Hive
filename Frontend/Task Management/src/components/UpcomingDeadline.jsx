import React, { useContext } from "react";
import { Context } from "../context/Context";

const UpcomingDeadline = ({ upcoming }) => {
  const { darkMode, getDate } = useContext(Context);
  const even = (num) => {
    return num % 2 == 0;
  };
  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="text-2xl font-semibold">Upcoming Deadlines</h1>
      <div className="flex gap-x-3 pt-3">
        <div className="flex gap-x-1 items-center">
          <div className="w-3 h-3 bg-green-500 rounded-[4px]"></div>
          <h1 className="text-15">Low Priority</h1>
        </div>
        <div className="flex gap-x-1 items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-[4px]"></div>
          <h1 className="text-15">Medium Priority</h1>
        </div>
        <div className="flex gap-x-1 items-center">
          <div className="w-3 h-3 bg-red-500 rounded-[4px]"></div>
          <h1 className="text-15">High Priority</h1>
        </div>
      </div>
      <div className="flex flex-col gap-y-7 pt-5">
        {upcoming.length > 1 ? (
          upcoming.map((task, index) => (
            <div key={task.id}>
              {!even(index) ? (
                <div
                  className={` ml-24 p-4 w-fit border-l-[5px] hover:scale-125 duration-500 rounded-r-2xl ${
                    darkMode == "dark" ? "bg-myblack2" : "bg-white"
                  } ${
                    task.priority == "High"
                      ? "border-l-red-600"
                      : task.priority == "Medium"
                      ? "border-l-yellow-600"
                      : "border-l-green-600"
                  }`}
                >
                  <h1 className="font-semibold">{task.title}</h1>
                  <h1 className="text-14">{getDate(task.due_date)}</h1>
                </div>
              ) : (
                <div
                  className={` p-4 w-fit border-l-[5px] hover:scale-125 duration-500 rounded-r-2xl ${
                    darkMode == "dark" ? "bg-myblack2" : "bg-white"
                  } ${
                    task.priority == "High"
                      ? "border-l-red-600"
                      : task.priority == "Medium"
                      ? "border-l-yellow-600"
                      : "border-l-green-600"
                  }`}
                >
                  <h1 className="font-semibold">{task.title}</h1>
                  <h1 className="text-14">{getDate(task.due_date)}</h1>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1 className="text-xl font-semibold">No Upcoming Deadlines</h1>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadline;
