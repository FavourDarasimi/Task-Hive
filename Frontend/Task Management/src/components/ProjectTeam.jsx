import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { MdStars } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const ProjectTeam = ({ project, setAdded }) => {
  const { username, darkMode, addMemberToProject } = useContext(Context);

  const [param, setParam] = useState();

  const onSubmit = async () => {
    try {
      const response = await addMemberToProject(project.id, param);
      setAdded(param);
      console.log(response);
      alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={` pt-10 my-10 ${
        darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
      } rounded-xl w-60% px-5 pb-10 pt-5 ml-5 `}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-2 ">Project Team</h1>
        {project.name == "Personal Tasks" ? (
          ""
        ) : (
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
        )}
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
            key={member.id}
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
              {username == member.username ? <MdStars className="w-4 h-4 text-blue-600" /> : ""}
            </div>
            <h1 className="text-15 w-30%">{member.full_name}</h1>
            <h1 className="text-15 w-30%">{member.email}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTeam;
