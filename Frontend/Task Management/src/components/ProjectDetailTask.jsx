import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit, MdOutlineAlarmAdd, MdError } from "react-icons/md";
import EditTask from "../components/EditTask";

const ProjectDetailTask = ({
  task,
  showEdit,
  setShowEdit,
  showMenu,
  setShowMenu,
  update,
  setUpdate,
  project,
  setIsChecked,
  ischecked,
  projectId,

  setDelete,
}) => {
  const { username, completeTask, darkMode, deleteTask, updateDueDate, getDate } =
    useContext(Context);
  const [openAdd, setOpenAdd] = useState([]);
  const [dueDate, setDueDate] = useState();

  const disabled = (users) => {
    const members = [];
    const user = users.map((user) => members.push(user.username));
    if (members.includes(username)) {
      return false;
    } else {
      return true;
    }
  };
  const userInMembers = (users) => {
    const members = [];
    const user = users.map((user) => members.push(user.username));
    return members.includes(username);
  };

  const usersInTask = (taskUsers, member) => {
    const members = [];
    const user = taskUsers.map((user) => members.push(user.username));
    return members.includes(member.username);
  };

  const delTask = async (id) => {
    try {
      const response = await deleteTask(id);
      setDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  const updDueDate = async (pk) => {
    try {
      const response = await updateDueDate(pk, dueDate);
      setUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e, id) => {
    e.preventDefault();
    try {
      const checked = e.target.checked;
      setIsChecked(!ischecked);
      const response = await completeTask(id, checked, projectId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div
        className={`${darkMode == "dark" ? "bg-myblack2" : "bg-white"} ${
          task.status == "Completed"
            ? "border-l-8 border-green-600"
            : task.status == "Pending"
            ? "border-l-8 border-red-600"
            : "border-l-8 border-yellow-600"
        } lg:p-3 sm:p-2 flex flex-col  rounded-2xl `}
      >
        {showEdit == task.id ? <EditTask task={task} setShowEdit={setShowEdit} /> : ""}

        <div className="flex justify-between items-start">
          <div className="flex lg:gap-x-2 sm:gap-x-1 items-center">
            <h1 className="lg:text-16 sm:text-10 font-semibold">{task.title}</h1>
          </div>
          <div className="flex ">
            {task.is_due ? (
              <MdError className="text-red-600 lg:w-5 lg:h-5 sm:w-[13px] sm:h-[13px]" />
            ) : (
              ""
            )}
            <div className="">
              <button onClick={() => (showMenu == task.id ? setShowMenu() : setShowMenu(task.id))}>
                <HiOutlineDotsVertical className="w-5 h-5" />
              </button>

              <div
                className={`${
                  darkMode == "dark" ? "bg-myblack" : "bg-white"
                }  shadow-2xl py-2 absolute rounded-lg flex flex-col gap-y-1 font-semibold  ${
                  showMenu == task.id ? "block" : "hidden"
                }`}
              >
                {project.name != "Personal Tasks" &&
                !task.is_due &&
                userInMembers(task.assigned_members) &&
                !task.completed ? (
                  <div>
                    <div
                      className={`flex gap-x-1 relative items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-green-600 hover:rounded-lg  hover:text-white ${
                        openAdd ? "bg-green-600 text-white rounded-lg" : ""
                      }`}
                      onClick={() => {
                        openAdd == task.id ? setOpenAdd() : setOpenAdd(task.id);
                      }}
                    >
                      <FaPlus />
                      <h1 className="">Add</h1>
                    </div>
                    {openAdd == task.id ? (
                      <div className="absolute bg-white shadow-2xl p-3 w-fit rounded-xl left-0 mt-[90px] ">
                        {project.assigned_members.map((member) => (
                          <div>
                            {!usersInTask(task.assigned_members, member) ? (
                              <div className="flex gap-x-1 items-center py-1">
                                <h1 className="w-20">{member.username}</h1>
                                <FaPlus />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div
                  className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white"
                  onClick={() => setShowEdit(task.id)}
                >
                  <MdEdit />
                  <h1 className="">Edit</h1>
                </div>
                <div
                  className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-red-600 hover:rounded-lg  hover:text-white"
                  onClick={() => delTask(task.id)}
                >
                  <MdDelete />
                  <h1 className="">Delete</h1>
                </div>

                {task.is_due && userInMembers(task.assigned_members) ? (
                  <div>
                    <div
                      className={`flex gap-x-1 relative items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-green-600 hover:rounded-lg  hover:text-white ${
                        update == task.id ? "bg-green-600 rounded-lg text-white" : ""
                      }`}
                      onClick={() => (update == task.id ? setUpdate() : setUpdate(task.id))}
                    >
                      <MdOutlineAlarmAdd />
                      <h1 className="">New Deadline</h1>
                    </div>
                    {update == task.id ? (
                      <div className="absolute right-0 mt-5 bg-white shadow-2xl p-3 rounded-xl">
                        <input
                          type="date"
                          value={dueDate || task.due_date}
                          className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full bg-anti-flash-white lg:h-10 sm:h-11 outline-none ${
                            darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                          } focus:border-blue-500 focus:border-2`}
                          placeholder="Due Date"
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                        <div className="w-full flex justify-center">
                          <button
                            className="bg-blue-600 p-1 text-white text-14 rounded-md mt-2 "
                            onClick={() => updDueDate(task.id)}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <h1
          className={`lg:text-13  sm:text-10 font-semibold lg:pl-6 sm:pl-3 ${
            task.priority == "High"
              ? "text-red-600"
              : task.priority == "Medium"
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {task.priority}
        </h1>
        <div className="flex items-center lg:gap-x-2 sm:gap-x-[2px]  lg:py-3 sm:py-2">
          <h1 className="font-semibold lg:text-14 sm:text-10 whitespace-nowrap">Deadline:</h1>
          <h1 className="lg:text-13 sm:text-[9px] whitespace-nowrap">{getDate(task.due_date)}</h1>
        </div>
        <div className="flex lg:text-16 sm:text-13 justify-between items-center lg:pb-2 sm:pb-1">
          <div className="flex -space-x-2 ">
            {task.assigned_members.map((member, index) =>
              index >= 3 ? (
                index == 3 ? (
                  <div
                    key={member.id}
                    className={`bg-anti-flash-white lg:text-17 sm:text-10 font-bold  lg:w-9 lg:h-9 sm:w-5 sm:h-5 shadow-2xl rounded-full border-1 flex items-center justify-center ${
                      darkMode == "dark" ? "text-black border-myblack" : "border-white"
                    }`}
                  >
                    +{task.assigned_members.length - index}
                  </div>
                ) : (
                  ""
                )
              ) : member.profile.avatar ? (
                <img
                  key={member.id}
                  src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                  className={`lg:w-9 lg:h-9 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded-full lg:ml-3 border-1 ${
                    darkMode == "dark" ? "border-myblack" : "border-white"
                  }`}
                />
              ) : (
                <FaUserCircle
                  key={member.id}
                  className={`lg:w-9 lg:h-9 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded-full lg:ml-3 border-1 ${
                    darkMode == "dark" ? "border-myblack" : "border-white"
                  }`}
                />
              )
            )}
          </div>
          <h1 className="lg:text-13 sm:text-10 whitespace-nowrap">{getDate(task.created_at)}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailTask;
