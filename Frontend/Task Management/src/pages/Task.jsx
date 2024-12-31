import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { FaPlus } from "react-icons/fa";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
const Task = () => {
  const { getUsersTask, darkMode } = useContext(Context);
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState();
  const [status, setStatus] = useState("");
  useEffect(() => {
    const handleGetTasks = async () => {
      try {
        const response = await getUsersTask();
        if (status == "") {
          setTasks(response);
        } else if (status == "pending") {
          const data = response.filter((task) => task.status == "Pending");
          setTasks(data);
        } else if (status == "in progress") {
          const data = response.filter((task) => task.status == "In Progress");
          setTasks(data);
        } else if (status == "completed") {
          const data = response.filter((task) => task.status == "Completed");
          setTasks(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetTasks();
  }, [status, show]);
  return (
    <div
      className={`sm:pl-10 sm:pr-3 lg:px-10 ${darkMode == "dark" ? "text-anti-flash-white" : ""}`}
    >
      {show ? <AddTask setShow={setShow} id={null} /> : ""}
      <div className="flex justify-between">
        <h1 className="lg:text-3xl sm:text-18 font-bold">Tasks</h1>
        <button
          className="bg-blue-600 rounded-lg lg:p-2 sm:p-2 lg:text-15 sm:text-13 text-white flex items-center gap-x-2"
          onClick={() => setShow(true)}
        >
          <FaPlus />
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-3  gap-x-2 pt-5">
        <div
          className={`${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } rounded-lg lg:p-3 sm:px-1 sm:py-2 flex gap-x-1 items-center cursor-pointer`}
          onClick={() => setStatus("")}
        >
          <div className="h-4 w-4 bg-black rounded-full"></div>
          <h1 className="font-bold lg:text-16 sm:text-13">All</h1>
        </div>

        <div
          className={`${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } rounded-lg lg:p-3 sm:px-1 sm:py-2 flex gap-x-1 items-center cursor-pointer`}
          onClick={() => setStatus("in progress")}
        >
          <div className="h-4 w-4 bg-yellow-600 rounded-full"></div>
          <h1 className="lg:text-16 sm:text-13">In Progress</h1>
        </div>
        <div
          className={`${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } rounded-lg lg:p-3 sm:px-1 sm:py-2 flex gap-x-1 items-center cursor-pointer`}
          onClick={() => setStatus("completed")}
        >
          <div className="h-4 w-4 bg-green-600 rounded-full"></div>
          <h1 className="lg:text-16 sm:text-13">Completed</h1>
        </div>
      </div>

      <TaskList tasks={tasks} />
    </div>
  );
};

export default Task;
