import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import cancel from "../assets/icons8-cross-24.png";
import Select from "react-select";
import { MdOutlineAddToPhotos } from "react-icons/md";

const AddTask = ({ setShow, projectid, projectName, projectMembers }) => {
  const { createTask, getTeamMembers, username, darkMode } = useContext(Context);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const response = await getTeamMembers();

      const members = response.members;
      const teamMembers = projectMembers.filter((member) => member.username != username);
      const options = teamMembers.map((member) => ({
        value: member.id,
        label: member.username,
      }));
      console.log(options);
      setTeams(options);
    };
    fetchTeamMembers();
  }, []);

  const handleSubmit = async (e, title, priority, date, team) => {
    e.preventDefault();
    try {
      const response = await createTask(title, priority, date, projectid, team, checked);
      console.log(projectid);
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
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      cursor: "pointer",
      ":hover": {
        backgroundColor: "red",
        color: "white",
      },
    }),
  };

  return (
    <div className=" fixed z-10 inset-0  bg-black w-100%   bg-opacity-30 grid place-items-center  ">
      <form
        className={` rounded-3xl  ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } w-35% h-fit  fixed`}
        onSubmit={(e) => {
          handleSubmit(e, title, priority, dueDate, selectedTeam);
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
        <div className="flex flex-col gap-y-3  lg:px-8 sm:px-4 lg:pb-10 sm:pb-5">
          <div className="flex gap-x-1 items-center">
            <div className="bg-blue-300  p-1 rounded-lg">
              <MdOutlineAddToPhotos className="lg:w-7 lg:h-7 sm:w-5 sm:h-5 text-blue-600 " />
            </div>
            <h1 className="text-center lg:text-2xl sm:text-19 font-semibold">ADD TASK</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-1">
            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Title</label>
              <input
                type="text"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Priority</label>

              <div className="flex gap-x-3">
                <label class="cursor-pointer w-full">
                  <input
                    name="gender"
                    type="radio"
                    class="peer sr-only"
                    onChange={(e) => {
                      setPriority("Low");
                    }}
                  />
                  <div class="rounded-xl border-1 text-17 border-gray-300 h-14 flex gap-x-1 w-full items-center justify-center py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-green-600 peer-checked:ring-green-600 peer-checked:ring-offset-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>Low
                  </div>
                </label>
                <label class="cursor-pointer w-full">
                  <input
                    name="gender"
                    type="radio"
                    class="peer sr-only"
                    onChange={(e) => {
                      setPriority("Medium");
                    }}
                  />
                  <div class="rounded-xl border-1 text-17 border-gray-300 h-14 flex gap-x-1 w-full items-center justify-center py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-yellow-600 peer-checked:ring-yellow-600 peer-checked:ring-offset-2">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>Medium
                  </div>
                </label>
                <label class="cursor-pointer w-full">
                  <input
                    name="gender"
                    type="radio"
                    class="peer sr-only"
                    onChange={(e) => {
                      setPriority("High");
                    }}
                  />
                  <div class="rounded-xl border-1 text-17 border-gray-300 h-14 flex gap-x-1 w-full items-center justify-center py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-red-600 peer-checked:ring-red-600 peer-checked:ring-offset-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>High
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Due Date</label>
              <input
                type="date"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-11 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Due Date"
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            {projectName == "Personal Tasks" || !projectid ? (
              ""
            ) : (
              <div className="flex gap-x-2 items-center ">
                <div className="flex flex-col w-80%">
                  <label className="font-semibold lg:text-16 sm:text-xs pb-1">
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
                    className="text-xs"
                  />
                </div>
                <div className="flex flex-col  pt-2 lg:w-20% sm:w-25% ">
                  <label className="lg:text-13 sm:text-10">Add me</label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end ">
            <button
              type="submit"
              className="text-white py-2 px-3 sm:w-fit md:w-fit rounded-lg bg-dark-white lg:w-fit text-16 font-semibold bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
