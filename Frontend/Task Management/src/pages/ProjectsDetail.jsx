import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";
import { FaPlus } from "react-icons/fa";
import AddTask from "../components/AddTask";
import { ColorRing } from "react-loader-spinner";
import ProjectTasks from "../components/ProjectTasks";
import ProjectTeam from "../components/ProjectTeam";
import ProjectPercentage from "../components/ProjectPercentage";

const ProjectsDetail = () => {
  const { projectId } = useParams();
  const { getProjectDetails, darkMode } = useContext(Context);
  const [project, setProject] = useState();
  const [tasks, setTask] = useState();
  const [completedTasks, setCompletedTask] = useState();
  const [ongoingTasks, setOngoingTask] = useState();
  const [status, setStatus] = useState("all");
  const [offset, setOffset] = useState();
  const [showTask, setShowTask] = useState(false);
  const [ischecked, setIsChecked] = useState(false);
  const [showMenu, setShowMenu] = useState();
  const [added, setAdded] = useState();
  const [del, setDelete] = useState();
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const specificElementRef = useRef(null);

  const handlePageClick = (event) => {
    if (!specificElementRef.current?.contains(event.target)) {
      setShowMenu();
    }
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

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
      } finally {
        setLoading(false);
      }
    };
    fetchDetailProjects();
  }, [status, showTask, ischecked, added, del, update, showEdit]);

  return (
    <div className="mx-10 relative" onClick={handlePageClick}>
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
                  <div ref={specificElementRef}>
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
                )}
              </div>
            </div>
            <div className="w-30% flex flex-col items-center gap-y-5">
              <ProjectPercentage
                radius={radius}
                circumference={circumference}
                offset={offset}
                project={project}
                completedTasks={completedTasks}
                tasks={tasks}
              />
            </div>
          </div>
          <ProjectTeam project={project} setAdded={setAdded} />
        </div>
      )}
    </div>
  );
};

export default ProjectsDetail;
