import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { HiMiniArrowPath, HiOutlineUsers } from "react-icons/hi2";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import AddTask from "../components/AddTask";

const ProjectsDetail = () => {
  const { projectId } = useParams();
  const { getProjectDetails, username, completeTask, darkMode, addMemberToProject, deleteTask } =
    useContext(Context);
  const [project, setProject] = useState();
  const [tasks, setTask] = useState();
  const [completedTasks, setCompletedTask] = useState();
  const [ongoingTasks, setOngoingTask] = useState();
  const [status, setStatus] = useState("all");
  const [offset, setOffset] = useState();
  const [isHover, setIsHover] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [ischecked, setIsChecked] = useState(false);
  const [showMenu, setShowMenu] = useState();
  const [added, setAdded] = useState();
  const [param, setParam] = useState();
  const [del, setDelete] = useState();

  const radius = 45; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  // Calculate offset

  const disabled = (users) => {
    const members = [];
    const user = users.map((user) => members.push(user.username));
    if (members.includes(username)) {
      return false;
    } else {
      return true;
    }
  };

  const delTask = async (id) => {
    try {
      const response = await deleteTask(id);
      setDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDetailProjects = async () => {
      try {
        const response = await getProjectDetails(projectId);
        setProject(response.project);
        const offset = circumference - (response.project.percentage / 100) * circumference;
        setOffset(offset);
        const task = response.task;
        const completedTasks = task.filter((num) => num.status == "Completed");
        const ongoingTasks = task.filter((num) => num.status == "In Progress");
        if (status == "all") {
          setTask(response.task);
        } else if (status == "completed") {
          setTask(completedTasks);
        } else if (status == "ongoing") {
          setTask(ongoingTasks);
        }
        console.log(completedTasks);
        setCompletedTask(completedTasks);
        setOngoingTask(ongoingTasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailProjects();
  }, [status, showTask, ischecked, added, del]);

  const handleChange = async (e, id) => {
    e.preventDefault();
    try {
      const checked = e.target.checked;
      setIsChecked(!ischecked);
      const response = await completeTask(id, checked, projectId);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      const response = await addMemberToProject(projectId, param);
      setAdded(param);
      console.log(response);
      alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-10 relative">
      {project ? (
        <div>
          {showTask ? (
            <AddTask
              projectid={project.id}
              projectName={project.name}
              projectMembers={project.assigned_members}
              setShow={setShowTask}
            />
          ) : (
            ""
          )}
          <div className="flex  justify-between">
            <h1 className="text-3xl text-blue-600 font-bold">{project.name}</h1>

            <button
              className="bg-blue-600 rounded-lg p-2 text-15 text-white flex items-center gap-x-2"
              onClick={() => setShowTask(true)}
            >
              <FaPlus />
              Add Task
            </button>
          </div>
          <div className="flex mt-10 ">
            <div className="w-70%">
              <div className="flex gap-x-5">
                <h1
                  className={` text-18 cursor-pointer ${
                    status == "all"
                      ? "text-blue-600 font-bold border-b-4 border-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setStatus("all")}
                >
                  All {tasks.length}
                </h1>
                <h1
                  className={` text-18 cursor-pointer ${
                    status == "ongoing"
                      ? "text-blue-600 font-bold border-b-4 border-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setStatus("ongoing")}
                >
                  In Progress {ongoingTasks.length}
                </h1>
                <h1
                  className={` text-18 cursor-pointer ${
                    status == "completed"
                      ? "text-blue-600 font-bold border-b-4 border-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setStatus("completed")}
                >
                  Completed {completedTasks.length}
                </h1>
              </div>
              <div className="flex flex-col mt-4">
                {tasks.length == 0 ? (
                  <h1
                    className={`font-semibold text-19 mt-3 ${
                      darkMode == "dark" ? "text-anti-flash-white" : ""
                    }`}
                  >
                    No Task in this Project yet
                  </h1>
                ) : (
                  <div>
                    {tasks.map((task) => (
                      <div
                        className={`flex gap-x-20 w-fit  ${
                          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
                        } p-5 rounded-lg mb-3`}
                      >
                        <div className="flex gap-x-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            disabled={disabled(task.assigned_members)}
                            onChange={(e) => handleChange(e, task.id)}
                          />
                          <p className="w-72 text-17 font-semibold">{task.title}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <HiMiniArrowPath />
                          <p>{task.status}</p>
                        </div>
                        <div className="flex items-center gap-x-2 w-20">
                          <div
                            className={` h-3 w-3 rounded-full ${
                              task.priority == "High"
                                ? "bg-green-600"
                                : task.priority == "Low"
                                ? "bg-red-600"
                                : "bg-yellow-600"
                            }`}
                          ></div>
                          <p>{task.priority}</p>
                        </div>
                        <div className="flex gap-x-2 relative">
                          <button
                            onMouseEnter={() => setIsHover(task.id)}
                            onMouseLeave={() => setIsHover(false)}
                          >
                            <HiOutlineUsers className="w-5 h-5" />
                          </button>
                          <p>{task.assigned_members.length}</p>
                          {isHover == task.id && (
                            <div
                              className={` absolute  z-1 left-0 bottom-0 mb-5 bg-white shadow-2xl border-1 border-gray-300 rounded-lg p-5 w-fit`}
                            >
                              <div className="flex flex-col gap-y-3 px-3">
                                <h1 className="text-17  font-bold text-blue-600 text-center w-64">
                                  Assigned Team Memebers
                                </h1>
                                {task.assigned_members.map((member) => (
                                  <div className="flex items-center gap-x-5">
                                    <div className="flex items-center gap-x-1 w-60%">
                                      {member.profile.avatar ? (
                                        <img
                                          src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                                          className={`lg:w-10 lg:h-10 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                                            darkMode == "dark" ? "border-myblack" : "border-white"
                                          }`}
                                        />
                                      ) : (
                                        <FaUserCircle
                                          className={`lg:w-10 lg:h-10 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                                            darkMode == "dark" ? "border-myblack" : "border-white"
                                          }`}
                                        />
                                      )}
                                      <h1 className="font-semibold text-15">{member.username}</h1>
                                    </div>
                                    <h1 className="w-40% text-15">{member.email}</h1>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="">
                          <button
                            onClick={() =>
                              showMenu == task.id ? setShowMenu() : setShowMenu(task.id)
                            }
                          >
                            <HiOutlineDotsVertical className="w-5 h-5" />
                          </button>

                          <div
                            className={`${
                              darkMode == "dark" ? "bg-myblack" : "bg-white"
                            }  shadow-2xl py-2 absolute rounded-lg flex flex-col gap-y-3 font-semibold  ${
                              showMenu == task.id ? "block" : "hidden"
                            }`}
                          >
                            <div className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white">
                              <MdEdit />
                              <h1 className="">Edit</h1>
                            </div>
                            <div
                              className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-red-600 hover:rounded-lg  hover:text-white"
                              onClick={() => delTask(task.id)}
                            >
                              <MdDelete />
                              <h1 className="">Delete</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-30% flex flex-col items-center gap-y-5">
              <div
                className={` ${
                  darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
                } rounded-xl w-fit px-14 pb-10 pt-5`}
              >
                <h1 className="text-center font-semibold text-2xl mb-10">Task Completed</h1>
                <div className="">
                  <div className="relative">
                    <svg className="w-44 h-44" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="#ddd"
                        strokeWidth="7"
                      />
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
            </div>
          </div>
          <div
            className={` pt-10 my-10 ${
              darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
            } rounded-xl w-60% px-5 pb-10 pt-5 ml-5 `}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold mb-2 ">Project Team</h1>
              <div className="flex ">
                <input
                  className={`border-1 ${
                    darkMode == "dark" ? "border-myblack bg-myblack2" : "border-mygrey2 bg-white"
                  } rounded-l-md p-2 outline-none focus:border-2 w-52 h-10  focus:border-blue-600`}
                  type="email"
                  placeholder="Email Address/Username"
                  onChange={(e) => setParam(e.target.value)}
                />
                <button
                  onClick={() => onSubmit()}
                  className="bg-blue-600 text-white px-5 font-semibold rounded-r-md outline-none"
                >
                  Add
                </button>
              </div>
            </div>
            <ul className="list-disc pt-5">
              <div
                className={` flex gap-x-2 pb-2 border-b-1 ${
                  darkMode == "dark" ? "border-myblack" : "border-gray-300"
                }`}
              >
                <h1 className="w-40% font-semibold">Username</h1>
                <h1 className="w-30% font-semibold">Fullname</h1>
                <h1 className="w-30% font-semibold">Email</h1>
              </div>
              {project.assigned_members.map((member) => (
                <li
                  className={`flex  items-center gap-x-2 border-b-1 ${
                    darkMode == "dark" ? "border-myblack" : "border-gray-300"
                  } py-1`}
                >
                  <div className="flex items-center gap-x-1 w-40%">
                    {member.profile.avatar ? (
                      <img
                        src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                        className={`lg:w-10 lg:h-10 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                          darkMode == "dark" ? "border-myblack" : "border-white"
                        }`}
                      />
                    ) : (
                      <FaUserCircle
                        className={`lg:w-10 lg:h-10 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                          darkMode == "dark" ? "border-myblack" : "border-white"
                        }`}
                      />
                    )}
                    <h1 className="text-15 font-semibold">{member.username}</h1>
                  </div>
                  <h1 className="text-15 w-30%">{member.full_name}</h1>
                  <h1 className="text-15 w-30%">{member.email}</h1>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectsDetail;
