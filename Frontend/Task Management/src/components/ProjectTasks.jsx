import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import EditTask from "../components/EditTask";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { HiMiniArrowPath, HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit, MdOutlineAlarmAdd, MdError } from "react-icons/md";
import ProjectTaskMenu from "./ProjectTaskMenu";

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
  setAddedUser,
}) => {
  const { username, completeTask, darkMode, deleteTask, updateDueDate, searchTaskMembers } =
    useContext(Context);
  const [isHover, setIsHover] = useState(false);
  const [openAdd, setOpenAdd] = useState();
  const [unassigned, setUnassigned] = useState([]);
  const [dueDate, setDueDate] = useState();
  const [searchedMembers, setSearchedMembers] = useState();
  const [param, setParam] = useState();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMembersId, setSelectedMembersId] = useState([]);

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

  const removeSelectedUser = (member) => {
    setSelectedMembers(selectedMembers.filter((user) => user != member));
    setSelectedMembersId(selectedMembersId.filter((user) => user != member.id));
  };

  const remove = (user) => {
    if (selectedMembersId.includes(user.id)) {
      setSelectedMembers(selectedMembers.filter((member) => member != user));
      setSelectedMembersId(selectedMembersId.filter((member) => member != user.id));
    } else {
      setSelectedMembers((prev) => [...prev, user]);
      setSelectedMembersId((prev) => [...prev, user.id]);
    }
  };

  const cancel = () => {
    setOpenAdd();
    setSelectedMembers([]);
    setSelectedMembersId([]);
    setParam();
  };

  const openAddMenu = (id) => {
    if (openAdd == id) {
      setOpenAdd();
      setSelectedMembers([]);
      setSelectedMembersId([]);
    } else {
      setOpenAdd(id);
    }
  };

  useEffect(() => {
    const team = async () => {
      try {
        const response = await searchTaskMembers(param, task.id, project.id);
        console.log(response);
        setSearchedMembers(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (param) {
      team();
    }
  }, [param]);

  return (
    <div
      className={`flex 3xl:gap-x-20 sm:gap-x-5 w-fit  ${
        darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
      } 3xl:px-5 sm:px-2 3xl:py-3 sm:py-[6px] rounded-lg mb-3`}
    >
      {showEdit == task.id ? <EditTask task={task} setShowEdit={setShowEdit} /> : ""}

      <div className="flex 3xl:gap-x-3 sm:gap-x-1 3xl:w-96 sm:w-32 items-center">
        <input
          type="checkbox"
          checked={task.completed}
          className="3xl:w-[13px] 3xl:h-[13px] sm:w-[10px] sm:h-[10px]"
          disabled={task.is_due ? true : disabled(task.assigned_members)}
          onChange={(e) => handleChange(e, task.id)}
        />
        <p className=" 3xl:text-15 sm:text-11 whitespace-nowrap font-semibold">{task.title}</p>
        <div>
          {task.is_due ? (
            <MdError className="text-red-600 3xl:w-5 3xl:h-5 sm:w-[13px] sm:h-[13px]" />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex items-center 3xl:text-15 sm:text-11 3xl:gap-x-2 sm:gap-x-1">
        <HiMiniArrowPath />
        <p className="whitespace-nowrap">{task.status}</p>
      </div>
      <div className="flex items-center 3xl:gap-x-2 sm:gap-x-1 3xl:w-20 sm:w-14">
        <div
          className={` 3xl:h-3 3xl:w-3 sm:h-2 sm:w-2 rounded-full ${
            task.priority == "High"
              ? "bg-red-600"
              : task.priority == "Low"
              ? "bg-green-600"
              : "bg-yellow-600"
          }`}
        ></div>
        <p className="3xl:text-15 sm:text-11 ">{task.priority}</p>
      </div>
      <div className="flex w-12 3xl:gap-x-2 sm:gap-x-1 items-center relative 3xl:text-15 sm:text-11">
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
                        className={`3xl:w-10 3xl:h-10 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full 3xl:ml-3 border-3 ${
                          darkMode == "dark" ? "border-myblack" : "border-white"
                        }`}
                      />
                    ) : (
                      <FaUserCircle
                        className={`3xl:w-10 3xl:h-10 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full 3xl:ml-3 border-3 ${
                          darkMode == "dark" ? "border-myblack" : "border-white"
                        }`}
                      />
                    )}
                    <h1 className="font-semibold 3xl:text-15 sm:text-11">{member.username}</h1>
                  </div>
                  <h1 className="w-40% 3xl:text-15 sm:text-11">{member.email}</h1>
                </div>
              ))}
            </div>
          </div>
        )}
        {project.user.username == username || userInMembers(task.assigned_members) ? (
          <div className="">
            <button onClick={() => (showMenu == task.id ? setShowMenu() : setShowMenu(task.id))}>
              <HiOutlineDotsVertical className="3xl:w-5 3xl:h-5 sm:w-3 sm:h-3" />
            </button>

            <ProjectTaskMenu
              project={project}
              task={task}
              showMenu={showMenu}
              userInMembers={userInMembers}
              openAdd={openAdd}
              setOpenAdd={setOpenAdd}
              setParam={setParam}
              param={param}
              searchedMembers={searchedMembers}
              selectedMembers={selectedMembers}
              selectedMembersId={selectedMembersId}
              remove={remove}
              removeSelectedUser={removeSelectedUser}
              cancel={cancel}
              setShowEdit={setShowEdit}
              delTask={delTask}
              update={update}
              setUpdate={setUpdate}
              dueDate={dueDate}
              setDueDate={setDueDate}
              updDueDate={updDueDate}
              setAddedUser={setAddedUser}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProjectTasks;
