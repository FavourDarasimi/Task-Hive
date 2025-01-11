import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import cancel from "../assets/icons8-cross-24.png";
import { MdOutlineAddToPhotos } from "react-icons/md";
import Select from "react-select";

const AddProject = ({ setShow }) => {
  const { createProject, getTeamMembers, username, darkMode } = useContext(Context);
  const [title, setTitle] = useState("");
  const [teams, setTeams] = useState();
  const [selectedTeam, setSelectedTeam] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const response = await getTeamMembers();

      const members = response.members;
      const teamMembers = members.filter((member) => member.username != username);
      const options = teamMembers.map((member) => ({
        value: member.id,
        label: member.username,
      }));
      console.log(options);
      setTeams(options);
    };
    fetchTeamMembers();
  }, []);

  const handleSubmit = async (e, title, team) => {
    e.preventDefault();
    try {
      const response = await createProject(title, team);
      console.log(selectedTeam);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      "@media (min-width: 1050px)": {
        height: "56px",
      },
      borderRadius: "12px",
      "@media (max-width: 750px)": {
        height: "44px",
      },
      backgroundColor: darkMode == "dark" ? "#181818" : "white",
      border: darkMode == "dark" ? "none" : "",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      cursor: "pointer",
      ":hover": {
        backgroundColor: "red",
        color: darkMode == "dark" ? "#181818" : "white",
      },
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: darkMode == "dark" ? "#212121" : "",
    }),
  };

  return (
    <div className=" fixed z-20 inset-0  bg-black w-100%   bg-opacity-30 grid place-items-center  ">
      <form
        className={` rounded-3xl  ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } 3xl:w-30% 2xl:w-30% xl:w-30% lg:w-30% sm:w-90% h-fit  fixed`}
        onSubmit={(e) => {
          handleSubmit(e, title, selectedTeam);
        }}
      >
        <div className="w-full flex justify-end pt-4 pr-4 ">
          <img
            src={cancel}
            alt=""
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShow(false)}
          />
        </div>
        <div className="flex flex-col gap-y-3 3xl:px-8  2xl:px-8  xl:px-8  lg:px-8 sm:px-5 3xl:pb-10 2xl:pb-10 xl:pb-10 lg:pb-10 sm:pb-5">
          <div className="flex gap-x-1 items-center justify-center">
            <div className="bg-blue-300 p-1 rounded-lg">
              <MdOutlineAddToPhotos className="3xl:w-7 3xl:h-7 2xl:w-7 2xl:h-7 xl:w-7 xl:h-7 lg:w-7 lg:h-7 sm:w-5 sm:h-5 text-blue-600 " />
            </div>
            <h1 className="text-center 3xl:text-2xl 2xl:text-2xl xl:text-2xl lg:text-2xl sm:text-18 font-semibold">
              ADD NEW PROJECT
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="flex flex-col">
              <label className="font-semibold 3xl:text-16 2xl:text-16 xl:text-16 lg:text-16 sm:text-14 pb-2">
                Title
              </label>
              <input
                type="text"
                className={`sm:text-xs 3xl:text-16 2xl:text-16 xl:text-16 lg:text-16  border-1 rounded-xl p-2 w-full  3xl:h-14 2xl:h-14 xl:h-14 lg:h-14 sm:h-11 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                }`}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold 3xl:text-16 2xl:text-16 xl:text-16 lg:text-16 sm:text-14 pb-2">
                Assigned Members
              </label>
              <Select
                options={teams}
                isMulti
                styles={customStyles}
                onChange={(e) => {
                  setSelectedTeam(e);
                  console.log(e);
                }}
                className="sm:text-xs 3xl:text-16 2xl:text-16 xl:text-16 lg:text-16"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white py-2 px-3 sm:w-fit md:w-fit rounded-lg bg-dark-white 3xl:w-fit text-16 font-semibold bg-blue-600"
            >
              New Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
