import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";
import { FaPlus } from "react-icons/fa";
import AddTask from "../components/AddTask";
import { ColorRing } from "react-loader-spinner";
import ProjectTasks from "../components/ProjectTasks";
import ProjectTeam from "../components/ProjectTeam";
import ProjectPercentage from "../components/ProjectPercentage";
import { RiProgress5Line } from "react-icons/ri";
import { FaUserCircle, FaCheckCircle } from "react-icons/fa";
import { BsFilterSquare } from "react-icons/bs";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import ProjectDetailTask from "../components/ProjectDetailTask";
import ProjectTaskDue from "../components/ProjectTaskDue";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

const ProjectsDetail = () => {
  const { projectId } = useParams();
  const { getProjectDetails, darkMode, getProjectTaskDueToday, getDate } = useContext(Context);
  const [project, setProject] = useState();
  const [tasks, setTask] = useState();
  const [taskDue, setTaskDue] = useState();
  const [completedTasks, setCompletedTask] = useState();
  const [ongoingTasks, setOngoingTask] = useState();
  const [status, setStatus] = useState("all");
  const [offset, setOffset] = useState();
  const [showTask, setShowTask] = useState(false);
  const [ischecked, setIsChecked] = useState(false);
  const [showMenu, setShowMenu] = useState();
  const [added, setAdded] = useState(false);
  const [removed, setRemoved] = useState(true);
  const [del, setDelete] = useState();
  const [all, setAll] = useState();
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState("ListView");
  const [isOpen, setIsOpen] = useState(false);
  const specificElementRef = useRef(null);
  const [addedUser, setAddedUser] = useState();

  const options = [
    { value: "ListView", label: "ListView", icon: <BsFilterSquare className="w-5 h-5" /> },
    { value: "DetailView", label: "DetailView", icon: <AdjustmentsHorizontalIcon /> },
  ];

  const radius = 35;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const fetchDetailProjects = async () => {
      try {
        const response = await getProjectDetails(projectId);
        setProject(response.project);
        const response2 = await getProjectTaskDueToday(projectId);
        setTaskDue(response2);
        const offset = circumference - (response.project.percentage / 100) * circumference;
        setOffset(offset);
        const task = response.task;
        setAll(task);
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
      } finally {
        setLoading(false);
      }
    };
    fetchDetailProjects();
  }, [status, showTask, ischecked, added, removed, del, update, showEdit, addedUser]);

  return (
    <div className="px-2 relative">
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
          <div
            className={`flex  justify-between 3xl:-mt-5 sm:-mt-10 ${
              darkMode == "dark" ? "text-anti-flash-white" : ""
            }`}
          >
            <div className="flex 3xl:flex-row sm:flex-col sm:gap-y-2 sm:items-start 3xl:items-center 3xl:gap-x-5 sm:gap-x-2">
              <h1 className="4xl:text-[26px] 3xl:text-2xl sm:text-16 whitespace-nowrap font-bold">
                {project.name}
              </h1>
              <div className="flex items-center gap-x-1 sm:pl-3">
                <div
                  className={`w-[9px] h-[9px] rounded-full ${
                    project.percentage <= 40
                      ? "bg-[#dc2626]"
                      : project.percentage <= 70
                      ? "bg-[#ca8a04]"
                      : project.percentage <= 99
                      ? "bg-[#2563eb]"
                      : "bg-[#16a34a]"
                  }`}
                ></div>
                <h1 className="4xl:text-17 3xl:text-16 sm:text-12 font-[500]">
                  {project.percentage <= 40
                    ? "Critical"
                    : project.percentage <= 70
                    ? "Below Target"
                    : project.percentage <= 99
                    ? "On Track"
                    : "Completed"}
                </h1>
              </div>

              {project.favourite ? (
                <StarSolid className="text-yellow-400 3xl:w-6 3xl:h-6 sm:w-3  cursor-pointer " />
              ) : (
                ""
              )}

              <div className="flex items-center 3xl:gap-x-2 sm:gap-x-1 sm:pl-2 3xl:-ml-5">
                {project.user.profile.avatar ? (
                  <img
                    src={`http://127.0.0.1:8000/${project.user.profile.avatar}`}
                    className={`4xl:w-10 4xl:h-10 3xl:w-9 3xl:h-9 md:w-4 md:h-4 sm:w-5 sm:h-5 rounded-full 3xl:ml-3 border-1 ${
                      darkMode == "dark" ? "border-myblack" : "border-white"
                    }`}
                  />
                ) : (
                  <FaUserCircle
                    className={`4xl:w-10 4xl:h-10 3xl:w-9 3xl:h-9 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded-full 3xl:ml-3 border-1 ${
                      darkMode == "dark" ? "border-myblack" : "border-white"
                    }`}
                  />
                )}
                <h1 className="font-semibold 4xl:text-16 3xl:text-15 sm:text-12">
                  {project.user.username}
                </h1>
              </div>
            </div>
            <div className="flex gap-x-5">
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="3xl:px-4 3xl:py-2 sm:px-2 sm:py-[4px] font-medium w-fit text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex gap-x-1 items-center 3xl:text-13 2xl:text-12 4xl:text-15 xl:text-11 lg:text-11 md:text-10 sm:text-10"
                >
                  <AdjustmentsHorizontalIcon className="w-4 h-4" />
                  {selected}
                </button>
                {isOpen ? (
                  <div className="absolute top-0 z-1 mt-12  shadow-2xl border border-gray-300 rounded-md flex flex-col gap-y-1 bg-white">
                    <h1
                      onClick={() => {
                        setSelected("ListView");
                        setIsOpen(false);
                      }}
                      className="hover:bg-gray-100 py-2 px-4 cursor-pointer 3xl:text-13 2xl:text-12 4xl:text-15 xl:text-11 lg:text-11 md:text-10 sm:text-10"
                    >
                      ListView
                    </h1>
                    <h1
                      onClick={() => {
                        setSelected("DetailView");
                        setIsOpen(false);
                      }}
                      className="hover:bg-gray-100 py-2 px-4 cursor-pointer 3xl:text-13 2xl:text-12 4xl:text-15 xl:text-11 lg:text-11 md:text-10 sm:text-10"
                    >
                      DetailView
                    </h1>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button
                className="bg-blue-600 rounded-lg 3xl:p-[7px] 4xl:p-[8px] 2xl:p-[7px] xl:p-[7px] lg:p-[5px] md:p-[5px] sm:p-[6px] 3xl:text-13 2xl:text-12 4xl:text-15 xl:text-11 lg:text-11 md:text-10 sm:text-10 text-white flex items-center 3xl:gap-x-2 4xl:gap-x-2 sm:gap-x-1"
                onClick={() => setShowTask(true)}
              >
                <FaPlus />
                New Task
              </button>
            </div>
          </div>
          <div className="flex 3xl:flex-row sm:flex-col mt-5 ">
            <div className="3xl:w-70% sm:w-100%">
              <div className="flex 3xl:gap-x-20 sm:gap-x-3">
                <div
                  className={`flex gap-x-2 items-center 4xl:text-16 3xl:text-15 sm:text-11 font-semibold rounded-xl  cursor-pointer 3xl:px-5 3xl:py-2 sm:px-2 sm:py-[6px] w-full ${
                    status == "all"
                      ? " bg-blue-200 font-bold "
                      : `${darkMode == "dark" ? "bg-myblack2 text-white" : "bg-white"}`
                  } `}
                  onClick={() => setStatus("all")}
                >
                  <div className="flex gap-x-1 items-center">
                    <RiProgress5Line className="text-yellow-600 w-5 h-5" />
                    <h1>All</h1>
                  </div>
                  <h1 className="bg-anti-flash-white rounded-full 3xl:py-[2px] sm:py-[1px] text-black 3xl:px-[10px] sm:px-[5px]">
                    {all.length}
                  </h1>
                </div>

                <div
                  className={`flex gap-x-2 items-center 4xl:text-16 3xl:text-15 sm:text-11 whitespace-nowrap font-semibold rounded-xl  cursor-pointer 3xl:px-5 3xl:py-2 sm:px-2 sm:py-[6px] w-full ${
                    status == "ongoing"
                      ? " bg-blue-200 font-bold "
                      : `${darkMode == "dark" ? "bg-myblack2 text-white" : "bg-white"}`
                  } `}
                  onClick={() => setStatus("ongoing")}
                >
                  <div className="flex gap-x-1 items-center">
                    <RiProgress5Line className="text-yellow-600 w-5 h-5" />
                    <h1>In Progress </h1>
                  </div>
                  <h1 className="bg-anti-flash-white rounded-full py-[2px] text-black px-[10px]">
                    {ongoingTasks.length}
                  </h1>
                </div>
                <div
                  className={`flex gap-x-2 items-center 4xl:text-16 3xl:text-15 sm:text-11 font-semibold rounded-xl  cursor-pointer 3xl:px-5 3xl:py-2 sm:px-2 sm:py-[6px] w-full ${
                    status == "completed"
                      ? " bg-blue-200 font-bold "
                      : `${darkMode == "dark" ? "bg-myblack2 text-white" : "bg-white"}`
                  } `}
                  onClick={() => setStatus("completed")}
                >
                  <div className="flex gap-x-1 items-center">
                    <FaCheckCircle className="text-green-600 w-4 h-4" />
                    <h1>Completed</h1>
                  </div>
                  <h1 className="bg-anti-flash-white rounded-full py-[2px] text-black px-[10px]">
                    {completedTasks.length}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col mt-1">
                <div>
                  {tasks.length == 0 ? (
                    <h1
                      className={`font-semibold text-19 mt-3 ${
                        darkMode == "dark" ? "text-anti-flash-white" : ""
                      }`}
                    >
                      No Task in this Project yet
                    </h1>
                  ) : (
                    <div ref={specificElementRef} className="flex justify-center pt-5">
                      {selected == "ListView" ? (
                        <div>
                          {tasks.map((task) => (
                            <ProjectTasks
                              task={task}
                              showEdit={showEdit}
                              setShowEdit={setShowEdit}
                              showMenu={showMenu}
                              setShowMenu={setShowMenu}
                              project={project}
                              update={update}
                              setUpdate={setUpdate}
                              setIsChecked={setIsChecked}
                              ischecked={ischecked}
                              projectId={projectId}
                              del={del}
                              setDelete={setDelete}
                              setAddedUser={setAddedUser}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-x-7 gap-y-5 w-full px-10">
                          {tasks.map((task) => (
                            <ProjectDetailTask
                              task={task}
                              showEdit={showEdit}
                              setShowEdit={setShowEdit}
                              showMenu={showMenu}
                              setShowMenu={setShowMenu}
                              project={project}
                              update={update}
                              setUpdate={setUpdate}
                              setIsChecked={setIsChecked}
                              ischecked={ischecked}
                              projectId={projectId}
                              del={del}
                              setDelete={setDelete}
                              setAddedUser={setAddedUser}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="3xl:w-30% sm:w-100% flex flex-col items-center gap-y-5">
              <ProjectTeam
                project={project}
                setAdded={setAdded}
                setRemoved={setRemoved}
                added={added}
                removed={removed}
              />

              <ProjectPercentage
                radius={radius}
                circumference={circumference}
                offset={offset}
                project={project}
                completedTasks={completedTasks}
                tasks={tasks}
                ongoingTasks={ongoingTasks}
              />
              <ProjectTaskDue taskDue={taskDue} getDate={getDate} darkMode={darkMode} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsDetail;
