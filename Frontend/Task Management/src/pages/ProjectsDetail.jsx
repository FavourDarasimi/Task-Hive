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
import { FaCheckCircle } from "react-icons/fa";
import { BsFilterSquare } from "react-icons/bs";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import ProjectDetailTask from "../components/ProjectDetailTask";
import ProjectTaskDue from "../components/ProjectTaskDue";

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

  const options = [
    { value: "ListView", label: "ListView", icon: <BsFilterSquare className="w-5 h-5" /> },
    { value: "DetailView", label: "DetailView", icon: <AdjustmentsHorizontalIcon /> },
  ];

  const handlePageClick = (event) => {
    if (!specificElementRef.current?.contains(event.target)) {
      setShowMenu();
    }
  };

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
  }, [status, showTask, ischecked, added, removed, del, update, showEdit]);

  return (
    <div className="px-2 relative" onClick={handlePageClick}>
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
          <div className="flex  justify-between lg:-mt-5 sm:-mt-10">
            <div className="flex items-center gap-x-5">
              <h1 className="lg:text-2xl sm:text-18  font-bold">{project.name}</h1>
              <div className="flex items-center gap-x-1">
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
                <h1 className="text-16 font-[500]">
                  {project.percentage <= 40
                    ? "Critical"
                    : project.percentage <= 70
                    ? "Below Target"
                    : project.percentage <= 99
                    ? "On Track"
                    : "Completed"}
                </h1>
              </div>
            </div>
            <div className="flex gap-x-5">
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className=" px-4 py-2 font-medium w-fit text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex gap-x-1 items-center text-14"
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
                      className="hover:bg-gray-100 py-2 px-4 cursor-pointer text-14"
                    >
                      ListView
                    </h1>
                    <h1
                      onClick={() => {
                        setSelected("DetailView");
                        setIsOpen(false);
                      }}
                      className="hover:bg-gray-100 py-2 px-4 cursor-pointer text-14"
                    >
                      DetailView
                    </h1>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button
                className="bg-blue-600 rounded-lg p-2 text-14 text-white flex items-center gap-x-2"
                onClick={() => setShowTask(true)}
              >
                <FaPlus />
                New Task
              </button>
            </div>
          </div>
          <div className="flex mt-5 ">
            <div className="w-70%">
              <div className="flex gap-x-20">
                <div
                  className={`flex gap-x-2 items-center text-15 font-semibold rounded-xl  cursor-pointer px-5 py-2 w-full ${
                    status == "all" ? " bg-blue-200 font-bold " : "bg-white"
                  }`}
                  onClick={() => setStatus("all")}
                >
                  <div className="flex gap-x-1 items-center">
                    <RiProgress5Line className="text-yellow-600 w-5 h-5" />
                    <h1>All</h1>
                  </div>
                  <h1 className="bg-anti-flash-white rounded-full py-[2px] px-[10px]">
                    {all.length}
                  </h1>
                </div>

                <div
                  className={`flex gap-x-2 items-center text-15 font-semibold rounded-xl  cursor-pointer px-5 py-2 w-full ${
                    status == "ongoing" ? " bg-blue-200 font-bold " : "bg-white"
                  }`}
                  onClick={() => setStatus("ongoing")}
                >
                  <div className="flex gap-x-1 items-center">
                    <RiProgress5Line className="text-yellow-600 w-5 h-5" />
                    <h1>In Progress </h1>
                  </div>
                  <h1 className="bg-anti-flash-white rounded-full py-[2px] px-[10px]">
                    {ongoingTasks.length}
                  </h1>
                </div>
                <div
                  className={`flex gap-x-2 items-center text-15 font-semibold rounded-xl  cursor-pointer px-5 py-2 w-full ${
                    status == "completed" ? " bg-blue-200 font-bold " : "bg-white"
                  }`}
                  onClick={() => setStatus("completed")}
                >
                  <div className="flex gap-x-1 items-center">
                    <FaCheckCircle className="text-green-600 w-4 h-4" />
                    <h1>Completed</h1>
                  </div>
                  <h1 className="bg-anti-flash-white rounded-full py-[2px] px-[10px]">
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
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-30% flex flex-col items-center gap-y-5">
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
