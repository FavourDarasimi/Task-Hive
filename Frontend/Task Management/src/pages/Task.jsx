import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { FaPlus } from "react-icons/fa";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import { ColorRing } from "react-loader-spinner";

const Task = () => {
  const { getUsersTask, darkMode } = useContext(Context);
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
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
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handleGetTasks();
  }, [status, show]);
  return (
    <div
      className={`sm:pl-10 sm:pr-3 lg:px-10 ${darkMode == "dark" ? "text-anti-flash-white" : ""}`}
    >
      {show ? <AddTask setShow={setShow} id={null} /> : ""}
      {loading ? (
        <div className="flex justify-center">
          <ColorRing
            height={100}
            width={100}
            colors={["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"]}
          />
        </div>
      ) : (
        <div>
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
          {tasks && tasks.length > 0 ? (
            <div className="grid lg:grid-cols-4 sm:grid-cols-1 pt-10 gap-x-7 gap-y-5">
              {tasks.map((task) => (
                <div key={task.id}>
                  <TaskList task={task} showEdit={showEdit} setShowEdit={setShowEdit} />
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-bounce h-24 pt-20">
              <h1 className="text-center font-semibold text-2xl ">
                No Task Available. Enjoy your free time!
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
