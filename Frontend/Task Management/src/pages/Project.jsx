import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { FaPlus } from "react-icons/fa";
import ProjectList from "../components/ProjectList";
import AddTask from "../components/AddTask";
import AddProject from "../components/AddProject";
import Spinner from "../assets/Iphone-spinner-2.gif";

const Project = () => {
  const { getUsersProject, darkMode } = useContext(Context);
  const [projects, setProjects] = useState([]);
  const [showTask, setShowTask] = useState(false);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState();
  const [filter, setFilter] = useState("all");
  const handleMoreClick = (event) => {
    event.stopPropagation();
    setShow(true);
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await getUsersProject();
        console.log(response);
        if (filter == "all") {
          setProjects(response);
        } else if (filter == "completed") {
          const completed = response.filter((project) => project.status == "Completed");
          setProjects(completed);
        } else if (filter == "in_progress") {
          const in_progress = response.filter((project) => project.status == "In Progress");
          setProjects(in_progress);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [show, showTask, filter]);
  return (
    <div
      className={`sm:pl-10 sm:pr-3 lg:px-10 ${darkMode == "dark" ? "text-anti-flash-white" : ""}`}
    >
      {show ? <AddProject setShow={setShow} /> : ""}
      <div className="">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-3xl sm:text-18 font-bold">My Projects</h1>
          <div className="flex gap-x-7">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className={`sm:w-20 outline-none lg:w-fit border-1 ${
                darkMode == "dark"
                  ? "bg-myblack2 border-myblack focus:border-black"
                  : "border-gray-300 focus:border-blue-500 "
              } py-2 pl-2 rounded-lg focus:border-2 text-16`}
            >
              <option selected disabled className="sm:text-xs lg:text-16">
                Sort By Status
              </option>
              <option value="all" className="sm:text-xs lg:text-16">
                All
              </option>
              <option value="completed" className="sm:text-xs lg:text-16">
                Completed
              </option>
              <option value="in_progress" className="sm:text-xs lg:text-16">
                In Progress
              </option>
            </select>
            <button
              className="bg-blue-600 rounded-lg lg:p-2 sm:p-1 lg:text-15 sm:text-13 text-white flex items-center gap-x-2"
              onClick={() => setShow(true)}
            >
              <FaPlus />
              New Project
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-1 lg:gap-x-10 sm:gap-x-5 gap-y-5 pt-5">
          {projects && projects.length ? (
            projects.map((project) => (
              <div>
                <ProjectList
                  project={project}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  showTask={showTask}
                  setShowTask={setShowTask}
                />
              </div>
            ))
          ) : (
            <div className="text-2xl font-semibold animate-bounce h-24 mt-5 whitespace-nowrap">
              <h1 className="text-center">No Projects found. Time to start something new!</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
