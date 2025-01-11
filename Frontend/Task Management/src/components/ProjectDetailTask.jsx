import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdError } from "react-icons/md";
import EditTask from "../components/EditTask";
import ProjectTaskMenu from "./ProjectTaskMenu";

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
  setAddedUser,
}) => {
  const {
    username,
    completeTask,
    darkMode,
    deleteTask,
    updateDueDate,
    getDate,
    searchTaskMembers,
  } = useContext(Context);
  const [openAdd, setOpenAdd] = useState([]);
  const [dueDate, setDueDate] = useState();
  const [searchedMembers, setSearchedMembers] = useState();
  const [param, setParam] = useState();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMembersId, setSelectedMembersId] = useState([]);

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
    searchedMembers();
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
    <div className="">
      <div
        className={`${darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"} ${
          task.status == "Completed"
            ? "border-l-[6px] border-green-600"
            : task.status == "Pending"
            ? "border-l-[6px] border-red-600"
            : "border-l-[6px] border-yellow-600"
        } 3xl:p-3 sm:p-2 flex flex-col  rounded-2xl `}
      >
        {showEdit == task.id ? <EditTask task={task} setShowEdit={setShowEdit} /> : ""}

        <div className="flex justify-between items-start">
          <div className="flex 3xl:gap-x-2 sm:gap-x-1 items-center">
            <h1 className="3xl:text-16 sm:text-10 font-semibold">{task.title}</h1>
          </div>
          <div className="flex ">
            {task.is_due ? (
              <MdError className="text-red-600 3xl:w-5 3xl:h-5 sm:w-[13px] sm:h-[13px]" />
            ) : (
              ""
            )}

            {project.user.username == username || userInMembers(task.assigned_members) ? (
              <div className="">
                <button
                  onClick={() => (showMenu == task.id ? setShowMenu() : setShowMenu(task.id))}
                >
                  <HiOutlineDotsVertical className="w-[18px] h-[18px]" />
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
        <h1
          className={`3xl:text-13  sm:text-10 font-semibold 3xl:pl-6 sm:pl-3 ${
            task.priority == "High"
              ? "text-red-600"
              : task.priority == "Medium"
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {task.priority}
        </h1>
        <div className="flex items-center 3xl:gap-x-2 sm:gap-x-[2px]  3xl:py-3 sm:py-2">
          <h1 className="font-semibold 3xl:text-14 sm:text-10 whitespace-nowrap">Deadline:</h1>
          <h1 className="3xl:text-13 sm:text-[9px] whitespace-nowrap">{getDate(task.due_date)}</h1>
        </div>
        <div className="flex 3xl:text-16 sm:text-13 justify-between items-center 3xl:pb-2 sm:pb-1">
          <div className="flex -space-x-2 ">
            {task.assigned_members.map((member, index) =>
              index >= 3 ? (
                index == 3 ? (
                  <div
                    key={member.id}
                    className={`bg-anti-flash-white 3xl:text-17 sm:text-10 font-bold  3xl:w-9 3xl:h-9 sm:w-5 sm:h-5 shadow-2xl rounded-full border-1 flex items-center justify-center ${
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
                  className={`3xl:w-9 3xl:h-9 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded-full 3xl:ml-3 border-1 ${
                    darkMode == "dark" ? "border-myblack" : "border-white"
                  }`}
                />
              ) : (
                <FaUserCircle
                  key={member.id}
                  className={`3xl:w-9 3xl:h-9 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded-full 3xl:ml-3 border-1 ${
                    darkMode == "dark" ? "border-myblack" : "border-white"
                  }`}
                />
              )
            )}
          </div>
          <h1 className="3xl:text-13 sm:text-10 whitespace-nowrap">{getDate(task.created_at)}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailTask;
