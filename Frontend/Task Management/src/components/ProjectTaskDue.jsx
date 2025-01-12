import React from "react";

const ProjectTaskDue = ({ taskDue, getDate, darkMode }) => {
  const even = (num) => {
    return num % 2 == 0;
  };
  return (
    <div>
      <h1 className="3xl:text-19 sm:text-15 font-semibold">Task Due Today</h1>
      <div className="flex flex-col gap-y-7 pt-5">
        {taskDue.length >= 1 ? (
          taskDue.map((task, index) => (
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
                  <h1 className="font-semibold 3xl:text-15 sm:text-13">{task.title}</h1>
                  <h1 className="3xl:text-13 sm:text-10">{getDate(task.due_date)}</h1>
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
                  <h1 className="font-semibold 3xl:text-15 sm:text-13">{task.title}</h1>
                  <h1 className="3xl:text-13 sm:text-10">{getDate(task.due_date)}</h1>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1 className="3xl:text-xl sm:text-18 font-semibold">No Task Due Deadlines</h1>
        )}
      </div>
    </div>
  );
};

export default ProjectTaskDue;
