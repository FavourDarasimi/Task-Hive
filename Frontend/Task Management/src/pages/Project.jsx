import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { FaPlus } from "react-icons/fa";
import ProjectList from "../components/ProjectList";
import AddProject from "../components/AddProject";
import { ColorRing } from "react-loader-spinner";
import { IoSearchOutline } from "react-icons/io5";

const Project = () => {
  const { getUsersProject, darkMode, searchResult } = useContext(Context);
  const [projects, setProjects] = useState([]);
  const [showTask, setShowTask] = useState(false);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState();
  const [del, setDel] = useState();
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [param, setParam] = useState();
  const [addedToFavorite, setAddedToFavorite] = useState(false);

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
    const search = async () => {
      try {
        const response = await searchResult(param);
        setProjects(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (param) {
      search();
    } else {
      getProjects();
    }
  }, [show, showTask, del, showEdit, param, , addedToFavorite]);
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
        <div className="3xl:-mt-8 sm:-mt-10">
          <div className="flex justify-between items-center">
            <div className="flex 3xl:gap-x-8 sm:gap-x-3">
              <h1 className="3xl:text-2xl 2xl:text-xl xl:text-18 4xl:text-3xl sm:text-14 font-bold">
                Projects Manager
              </h1>
              <div className="">
                <button
                  className="bg-blue-600 rounded-lg 3xl:p-2 4xl:p-[10px] 2xl:p-[7px] xl:p-[7px] sm:p-[6px] 3xl:text-14 2xl:text-12 4xl:text-15 xl:text-11 sm:text-10 text-white flex items-center 3xl:gap-x-2 4xl:gap-x-2 sm:gap-x-1"
                  onClick={() => setShow(true)}
                >
                  <FaPlus />
                  New Project
                </button>
              </div>
            </div>
            <div className="flex items-center focus-within:ring-2 focus-within:ring-blue-500 rounded-lg">
              <input
                placeholder="Search..."
                type="text"
                className="3xl:h-10 4xl:h-12 2xl:h-9 xl:h-8 sm:h-6 p-2 border-y-1 3xl:w-64 2xl:w-48 xl:w-40 sm:w-20 focus:border-none  rounded-l-lg outline-none border-y-gray-300 border-l-1 border-l-gray-300 placeholder:3xl:pl-2 placeholder:sm:pl-[1px] 3xl:text-16 4xl:text-17 2xl:text-14 xl:text-14 sm:text-10"
                onChange={(e) => setParam(e.target.value)}
              />
              <button className="bg-white pr-1 border-y-1 rounded-r-lg border-y-gray-300 sm:h-6 xl:h-8 2xl:h-9 3xl:h-10 4xl:h-12 border-r-1 border-r-gray-300">
                <IoSearchOutline className="text-gray-500  3xl:w-5 3xl:h-5 4xl:w-[22px] 4xl:h-[22px] 2xl:w-[17px] 2xl:h-[17px] sm:w-3 sm:h-3" />
              </button>
            </div>
          </div>
          <div className="grid 3xl:grid-cols-4 4xl:grid-cols-4 2xl:grid-cols-4 xl:grid-cols-4 xl:gap-x-3 sm:grid-cols-2 3xl:gap-x-10 2xl:gap-x-5 4xl:gap-x-5 sm:gap-x-5 gap-y-5 pt-5 3xl:px-10  sm:px-2">
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
                    setAddedToFavorite={setAddedToFavorite}
                    addedToFavorite={addedToFavorite}
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
