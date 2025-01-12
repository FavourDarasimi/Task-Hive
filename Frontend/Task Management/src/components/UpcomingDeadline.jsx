import React, { useContext } from "react";
import { Context } from "../context/Context";

const UpcomingDeadline = ({ upcoming }) => {
  const { darkMode, getDate } = useContext(Context);
  const even = (num) => {
    return num % 2 == 0;
  };
  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="3xl:text-xl 2xl:text-19 4xl:text-2xl sm:text-16 font-semibold">
        Upcoming Deadlines
      </h1>
      <div className="flex gap-x-3 pt-3">
        <div className="flex gap-x-1 items-center">
          <div className="w-3 h-3 bg-green-500 rounded-[4px]"></div>
          <h1 className="3xl:text-13 2xl:text-12 4xl:text-15 sm:text-11">Low Priority</h1>
        </div>
        <div className="flex gap-x-1 items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-[4px]"></div>
          <h1 className="3xl:text-13 2xl:text-12 4xl:text-15 sm:text-11">Medium Priority</h1>
        </div>
        <div className="flex gap-x-1 items-center">
          <div className="w-3 h-3 bg-red-500 rounded-[4px]"></div>
          <h1 className="3xl:text-13 2xl:text-12 4xl:text-15 sm:text-11">High Priority</h1>
        </div>
      </div>
      <div className="flex flex-col gap-y-7 pt-5">
        {upcoming.length >= 1 ? (
          upcoming.map((task, index) => (
            <div key={task.id}>
              {!even(index) ? (
                <div
                  className={` ml-24 3xl:p-4 sm:p-3 w-fit 3xl:border-l-[5px] sm:border-l-[3px] hover:scale-125 duration-500 rounded-r-2xl ${
                    darkMode == "dark" ? "bg-myblack2" : "bg-white"
                  } ${
                    task.priority == "High"
                      ? "border-l-red-600"
                      : task.priority == "Medium"
                      ? "border-l-yellow-600"
                      : "border-l-green-600"
                  }`}
                >
                  <h1 className="font-semibold 3xl:text-15 2xl:text-14 4xl:text-17 sm:text-13">
                    {task.title}
                  </h1>
                  <h1 className="3xl:text-13 2xl:text-12 4xl:text-14 sm:text-10">
                    {getDate(task.due_date)}
                  </h1>
                </div>
              ) : (
                <div
                  className={` 3xl:p-4 sm:p-3 w-fit 3xl:border-l-[5px] sm:border-l-[3px] hover:scale-125 duration-500 rounded-r-2xl ${
                    darkMode == "dark" ? "bg-myblack2" : "bg-white"
                  } ${
                    task.priority == "High"
                      ? "border-l-red-600"
                      : task.priority == "Medium"
                      ? "border-l-yellow-600"
                      : "border-l-green-600"
                  }`}
                >
                  <h1 className="font-semibold 3xl:text-15 2xl:text-14 4xl:text-17 sm:text-13">
                    {task.title}
                  </h1>
                  <h1 className="3xl:text-13 2xl:text-12 4xl:text-14 sm:text-10">
                    {getDate(task.due_date)}
                  </h1>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1 className="3xl:text-xl md:text-16 sm:text-18 font-semibold">No Upcoming Deadlines</h1>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadline;
