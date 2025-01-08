import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { FaPlus } from "react-icons/fa";
import ProjectList from "../components/ProjectList";
import AddProject from "../components/AddProject";
import { ColorRing } from "react-loader-spinner";

const Project = () => {
  const { getUsersProject, darkMode } = useContext(Context);
  const [projects, setProjects] = useState([]);
  const [showTask, setShowTask] = useState(false);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState();
  const [del, setDel] = useState();
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const handleMoreClick = (event) => {
    event.stopPropagation();
    setShow(true);
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await getUsersProject();
        console.log(response.profile);
        setProjects(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, [show, showTask, del, showEdit]);
  return (
    <div className={`px-2 ${darkMode == "dark" ? "text-anti-flash-white" : ""}`}>
      {show ? <AddProject setShow={setShow} /> : ""}
      {loading ? (
        <div className="flex justify-center">
          <ColorRing
            height={100}
            width={100}
            colors={["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"]}
          />
        </div>
      ) : (
        <div className="lg:-mt-5 sm:-mt-10">
          <div className="flex justify-between items-center">
            <h1 className="lg:text-2xl sm:text-14 font-bold">My Projects</h1>
            <div className="">
              <button
                className="bg-blue-600 rounded-lg lg:p-2 sm:p-[6px] lg:text-14 sm:text-10 text-white flex items-center lg:gap-x-2 sm:gap-x-1"
                onClick={() => setShow(true)}
              >
                <FaPlus />
                New Project
              </button>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-x-10 sm:gap-x-5 gap-y-5 pt-5">
            {projects.length ? (
              projects.map((project) => (
                <div key={project.id}>
                  <ProjectList
                    project={project}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    showTask={showTask}
                    setShowTask={setShowTask}
                    setDelete={setDel}
                    showEdit={showEdit}
                    setShowEdit={setShowEdit}
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
      )}
    </div>
  );
};

export default Project;
