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
  const [showMenu, setShowMenu] = useState();
  const [del, setDel] = useState();
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
  }, [status, show, del]);
  return (
    <div className={` px-[6px] ${darkMode == "dark" ? "text-anti-flash-white" : ""}`}>
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
        <div className="3xl:-mt-8 sm:-mt-10">
          <div className="flex justify-between">
            <h1 className="3xl:text-[22px] 2xl:text-xl xl:text-18 lg:text-17 md:text-16 4xl:text-[26px] sm:text-14 font-bold">
              My Tasks
            </h1>
            <button
              className="bg-blue-600 rounded-lg 3xl:p-[7px] 4xl:p-[8px] 2xl:p-[7px] xl:p-[7px] lg:p-[5px] md:p-[5px] sm:p-[6px] 3xl:text-13 2xl:text-12 4xl:text-15 xl:text-11 lg:text-11 md:text-10 sm:text-10 text-white flex items-center 3xl:gap-x-2 4xl:gap-x-2 sm:gap-x-1"
              onClick={() => setShow(true)}
            >
              <FaPlus />
              New Task
            </button>
          </div>
          <div className="grid grid-cols-3  3xl:gap-x-10 2xl:gap-x-9 xl:gap-x-7 lg:gap-x-5 md:gap-x-5 sm:gap-x-3 pt-5">
            <div
              className={` ${
                darkMode == "dark" ? "bg-myblack2" : "bg-white"
              } rounded-lg 3xl:p-3 2xl:p-2 xl:p-2  lg:p-2 md:p-2 sm:px-1 sm:py-2 flex gap-x-1 items-center cursor-pointer`}
              onClick={() => setStatus("")}
            >
              <div className="3xl:h-4 3xl:w-4 sm:w-2 sm:h-2 bg-black rounded-full"></div>
              <h1 className="font-semibold 4xl:text-16 3xl:text-15 2xl:text-14 xl:text-14 lg:text-12 md:text-12 sm:text-11">
                All
              </h1>
            </div>

            <div
              className={` ${
                darkMode == "dark" ? "bg-myblack2" : "bg-white"
              } rounded-lg 3xl:p-3 2xl:p-2 xl:p-2  lg:p-2 md:p-2 sm:px-1 sm:py-2 flex gap-x-1 items-center cursor-pointer`}
              onClick={() => setStatus("in progress")}
            >
              <div className="3xl:h-4 3xl:w-4 sm:w-2 sm:h-2 bg-yellow-600 rounded-full"></div>
              <h1 className="font-semibold 4xl:text-16 3xl:text-15 2xl:text-14 xl:text-14 lg:text-12 md:text-12 sm:text-11">
                In Progress
              </h1>
            </div>
            <div
              className={` ${
                darkMode == "dark" ? "bg-myblack2" : "bg-white"
              } rounded-lg 3xl:p-3 2xl:p-2 xl:p-2  lg:p-2 md:p-2 sm:px-1 sm:py-2 flex gap-x-1 items-center cursor-pointer`}
              onClick={() => setStatus("completed")}
            >
              <div className="3xl:h-4 3xl:w-4 sm:w-2 sm:h-2 bg-green-600 rounded-full"></div>
              <h1 className="font-semibold 4xl:text-16 3xl:text-15 2xl:text-14 xl:text-14 lg:text-12 md:text-12 sm:text-11">
                Completed
              </h1>
            </div>
          </div>
          {tasks && tasks.length > 0 ? (
            <div className="grid 3xl:grid-cols-5 4xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 xl:gap-x-3 sm:grid-cols-3 3xl:gap-x-3 2xl:gap-x-5 4xl:gap-x-4 lg:grid-cols-4 lg:gap-x-2 md:grid-cols-4 md:gap-x-3 sm:gap-x-2 gap-y-5 pt-5 3xl:px-3  sm:px-2">
              {tasks.map((task) => (
                <div key={task.id}>
                  <TaskList
                    task={task}
                    showEdit={showEdit}
                    setShowEdit={setShowEdit}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    setDel={setDel}
                  />
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
