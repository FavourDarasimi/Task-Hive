import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import EditTask from "../components/EditTask";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { HiMiniArrowPath, HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit, MdOutlineAlarmAdd, MdError } from "react-icons/md";

const ProjectTasks = ({
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
  const { username, completeTask, darkMode, deleteTask, updateDueDate } = useContext(Context);
  const [isHover, setIsHover] = useState(false);
  const [openAdd, setOpenAdd] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
  const [dueDate, setDueDate] = useState();

  const openUnassigned = (members) => {
    const projectAssignedMembers = project.assigned_members;
    const notAssigned = projectAssignedMembers.filter((member) => !members.includes(member.id));
    console.log(notAssigned);
    console.log(projectAssignedMembers);
    console.log(members);
    setUnassigned(notAssigned);
  };

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
    <div
      className={`flex gap-x-20 w-fit  ${
        darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
      } px-5 py-3 rounded-lg mb-3`}
    >
      {showEdit == task.id ? <EditTask task={task} setShowEdit={setShowEdit} /> : ""}

      <div className="flex gap-x-3 w-96 items-center">
        <input
          type="checkbox"
          checked={task.completed}
          disabled={task.is_due ? true : disabled(task.assigned_members)}
          onChange={(e) => handleChange(e, task.id)}
        />
        <p className=" text-15 font-semibold">{task.title}</p>
        <div>
          {task.is_due ? (
            <MdError className="text-red-600 lg:w-5 lg:h-5 sm:w-[13px] sm:h-[13px]" />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex items-center text-15 gap-x-2">
        <HiMiniArrowPath />
        <p>{task.status}</p>
      </div>
      <div className="flex items-center gap-x-2 w-20">
        <div
          className={` h-3 w-3 rounded-full ${
            task.priority == "High"
              ? "bg-red-600"
              : task.priority == "Low"
              ? "bg-green-600"
              : "bg-yellow-600"
          }`}
        ></div>
        <p className="text-15">{task.priority}</p>
      </div>
      <div className="flex gap-x-2 relative text-15">
        <button onMouseEnter={() => setIsHover(task.id)} onMouseLeave={() => setIsHover(false)}>
          <HiOutlineUsers className="w-4 h-4" />
        </button>
        <p>{task.assigned_members.length}</p>
        {isHover == task.id && (
          <div
            className={` absolute  z-1 left-0 bottom-0 mb-5 bg-white shadow-2xl border-1 border-gray-300 rounded-lg p-5 w-fit`}
          >
            <div className="flex flex-col gap-y-3 px-3">
              <h1 className="text-17  font-bold text-blue-600 text-center w-64">
                Assigned Team Memebers
              </h1>
              {task.assigned_members.map((member) => (
                <div className="flex items-center gap-x-5" key={member.id}>
                  <div className="flex items-center gap-x-1 w-60%">
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
                    <h1 className="font-semibold text-15">{member.username}</h1>
                  </div>
                  <h1 className="w-40% text-15">{member.email}</h1>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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
  );
};

export default ProjectTasks;
