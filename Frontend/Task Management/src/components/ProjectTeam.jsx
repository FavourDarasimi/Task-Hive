import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { MdStars } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const ProjectTeam = ({ project, setAdded, setRemoved, added, removed }) => {
  const { username, darkMode, addMemberToProject, removeMemberToProject } = useContext(Context);

  const [param, setParam] = useState();
  const [status, setStatus] = useState("Add");
  const [isOpen, setIsOpen] = useState(false);

  const addSubmit = async () => {
    try {
      const response = await addMemberToProject(project.id, param);
      setAdded(!added);
      console.log(response);
      alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  const removeSubmit = async () => {
    try {
      const response = await removeMemberToProject(project.id, param);
      setRemoved(!removed);
      console.log(response);
      alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={` py-3 ${
        darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
      } rounded-xl w-fit px-3   `}
    >
      <div className="flex justify-between">
        <h1 className="3xl:text-16 sm:text-13 text-center pb-3 font-semibold">Assigned Team</h1>
        {project.user.username == username && project.name !== "Personal Tasks" ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="3xl:px-4 3xl:py-[3px] sm:px-2 sm:py-[1px] font-medium w-fit text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex gap-x-1 items-center 3xl:text-13 sm:text-11"
            >
              {status}
            </button>
            {isOpen ? (
              <div className="absolute top-0 z-1 mt-12  shadow-2xl border border-gray-300 rounded-md flex flex-col gap-y-1 bg-white">
                <h1
                  onClick={() => {
                    setStatus("Add");
                    setIsOpen(false);
                  }}
                  className="hover:bg-gray-100 py-2 px-4 cursor-pointer text-14"
                >
                  Add
                </h1>
                <h1
                  onClick={() => {
                    setStatus("Remove");
                    setIsOpen(false);
                  }}
                  className="hover:bg-gray-100 py-2 px-4 cursor-pointer text-14"
                >
                  Remove
                </h1>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex justify-center items-center gap-x-3 pt-2">
        <div className="flex -space-x-3 ">
          {project.assigned_members.map((member, index) =>
            index >= 4 ? (
              index == 4 ? (
                <div
                  key={member.id}
                  className={`bg-anti-flash-white 3xl:text-15 sm:text-10 font-bold  3xl:w-10 3xl:h-10 sm:w-5 sm:h-5 shadow-2xl rounded-full border-2 flex items-center justify-center ${
                    darkMode == "dark" ? "text-black border-myblack" : "border-white"
                  }`}
                >
                  +{project.assigned_members.length - index}
                </div>
              ) : (
                ""
              )
            ) : member.profile.avatar ? (
              <img
                src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                className={`3xl:w-10 3xl:h-10 md:w-44 md:h-44 sm:w-8 sm:h-8 rounded-full border-2 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            ) : (
              <FaUserCircle
                className={`3xl:w-10 3xl:h-10 md:w-44 md:h-44 sm:w-8 sm:h-8 rounded-full border-2 ${
                  darkMode == "dark" ? "border-myblack" : "border-white"
                }`}
              />
            )
          )}
        </div>
        {project.name == "Personal Tasks" ? (
          ""
        ) : project.user.username == username ? (
          <div className="flex ">
            <input
              className={`border-1 3xl:text-12 sm:text-10 ${
                darkMode == "dark" ? "border-myblack bg-myblack2" : "border-mygrey2 bg-white"
              } rounded-l-md p-2 outline-none focus:border-2 3xl:w-40 sm:w-20 3xl:h-9 sm:h-7  focus:border-blue-600`}
              type="email"
              placeholder="Email Address/Username"
              onChange={(e) => setParam(e.target.value)}
            />{" "}
            <button
              onClick={() => (status == "Add" ? addSubmit() : removeSubmit())}
              className="bg-blue-600 text-white 3xl:text-12 sm:text-10 3xl:px-3 sm:px-[6px] font-semibold rounded-r-md outline-none"
            >
              {status == "Add" ? "Add" : "Remove"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProjectTeam;
