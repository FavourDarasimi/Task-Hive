import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Calendar } from "react-calendar";
import "./Calendar.css";

const DashBoard = () => {
  const { getTaskDueToday, getOnlineMembers, getTaskStatus, user, getDate, darkMode } =
    useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [all, setAll] = useState([]);
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [team, setTeam] = useState();

  useEffect(() => {
    const getDueTask = async () => {
      try {
        const response = await getTaskDueToday();
        setTasks(response);
      } catch (error) {
        console.log(error);
      }
    };
    const getOnlineMember = async () => {
      try {
        const response = await getOnlineMembers();
        if (response.team == true) {
          setOnlineMembers(response.user);
        } else if (response.team == false) {
          setTeam(response.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getStatus = async () => {
      try {
        const response = await getTaskStatus();
        setAll(response.all);
        setCompleted(response.completed);
        setPending(response.pending);
        setInProgress(response.in_progress);
      } catch (error) {
        console.log(error);
      }
    };
    getOnlineMember();
    getDueTask();
    getStatus();
  }, []);

  const getFirstLetter = (letter) => {
    const first_letter = letter[0].toUpperCase();
    return first_letter;
  };
  const colors = ["red", "green", "yellow", "blue", "indigo", "purple", "pink"];
  const shades = [400, 500, 600, 700, 800];
  const getRandomColor = () => {
    const color = ["red", "blue", "green"];
    const randomColor = color[Math.floor(Math.random() * color.length)];
    return randomColor;
  };
  return (
    <div className={`${darkMode == "dark" ? "text-anti-flash-white" : ""}`}>
      <div className="grid grid-cols-3 gap-x-5  ml-20 gap-y-10">
        <div
          className={`${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } rounded-xl w-fit h-fit p-7 col-span-2`}
        >
          {/* 1st Grid */}
          <h1 className="text-center text-xl font-semibold">Today's Deadline</h1>
          <div
            className={`flex gap-x-10 items-center text-17 font-semibold py-5 border-b-1 ${
              darkMode == "dark" ? "border-myblack" : "border-mygrey"
            } `}
          >
            <h1 className="w-96">Title</h1>
            <h1 className="w-28">Priority</h1>
            <h1 className="w-28">Team</h1>
            <h1 className="w-48">Date Added</h1>
          </div>

          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                className={`flex gap-x-10 items-center text-16 font-semibold py-5 border-b-1 ${
                  darkMode == "dark" ? "border-myblack" : "border-mygrey"
                } `}
              >
                <div className="flex gap-x-2 items-center w-96">
                  <div
                    className={` h-4 w-4 rounded-full ${
                      task.status == "Completed"
                        ? "bg-green-600"
                        : task.status == "Pending"
                        ? "bg-red-600"
                        : "bg-yellow-600"
                    }`}
                  ></div>
                  <h1 className="">{task.title}</h1>
                </div>
                <h1
                  className={`w-28  font-bold ${
                    task.priority == "High"
                      ? "text-red-500"
                      : task.priority == "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {task.priority}
                </h1>
                <div className="flex -space-x-2 w-28">
                  {task.assigned_members.map((member) => (
                    <div
                      style={{ backgroundColor: getRandomColor() }}
                      className={` rounded-full h-7 w-7  text-white text-13 flex items-center justify-center border-2 ${
                        darkMode == "dark" ? "border-myblack" : "border-white"
                      }`}
                    >
                      {getFirstLetter(member.username)}
                    </div>
                  ))}
                </div>
                <h1 className="w-48">{getDate(task.created_at)}</h1>
              </div>
            ))
          ) : (
            <p className="text-center font-semibold text-xl pt-5">No Deadlines Today</p>
          )}
        </div>
        {/* calender */}
        <div>
          <Calendar className={`${darkMode == "dark" ? "bg-myblack2" : "bg-white"}`} />
        </div>
      </div>

      {/* Down */}
      <div className="flex justify-center gap-x-16 mx-20 mt-10">
        {/* Total task */}
        <div
          className={`${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } p-7 rounded-xl grid grid-cols-2 gap-y-7 w-fit gap-x-16 h-fit`}
        >
          <div className="">
            <h1 className=" text-gray-400">Total Task</h1>
            <h1 className="text-5xl border-l-4 border-blue-500 pl-2">{all ? all.length : 0}</h1>
          </div>

          <div className="">
            <h1 className=" text-gray-400">Completed Task</h1>
            <h1 className="text-5xl border-l-4 border-green-500 pl-2">
              {completed ? completed.length : 0}
            </h1>
          </div>

          <div className="">
            <h1 className=" text-gray-400">Ongoing Task</h1>
            <h1 className="text-5xl border-l-4 border-yellow-500 pl-2">
              {inProgress ? inProgress.length : 0}
            </h1>
          </div>

          <div className="">
            <h1 className=" text-gray-400">Pending Task</h1>
            <h1 className="text-5xl border-l-4 border-red-500 pl-2">
              {pending ? pending.length : 0}
            </h1>
          </div>
        </div>
        {/* Online */}
        <div
          className={`${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } p-5 rounded-xl flex flex-col gap-y-3 h-fit`}
        >
          <h1 className="text-18 font-semibold px-10 pb-1">Online Team Members</h1>
          {team ? (
            <p>{team}</p>
          ) : onlineMembers.length > 1 ? (
            onlineMembers.map((member) =>
              member.username == user.username ? (
                ""
              ) : (
                <div className="flex gap-x-3 items-center">
                  <div
                    style={{ backgroundColor: getRandomColor() }}
                    className=" rounded-full h-12 w-12 text-white text-17 flex items-center justify-center border-2 border-white relative"
                  >
                    {getFirstLetter(member.username)}
                    <div className="h-3 w-3 absolute bottom-0 right-0 bg-online rounded-full border-2 border-white"></div>
                  </div>
                  <h1>{member.username}</h1>
                </div>
              )
            )
          ) : (
            <p className="text-center font-semibold text-18">No Team Members Online</p>
          )}
        </div>

        {/* Completed */}
        <div className={` ${darkMode == "dark" ? "bg-myblack2" : "bg-white"} p-5 rounded-xl h-fit`}>
          <h1 className="text-center text-18 font-semibold">Completed Task</h1>
          {completed.map((task) => (
            <div
              className={`flex py-4 border-b-1 ${
                darkMode == "dark" ? "border-myblack" : "border-mygrey"
              }`}
            >
              <div className="flex space-x-2 items-center ">
                <div
                  className={` h-4 w-4 rounded-full ${
                    task.status == "Completed"
                      ? "bg-green-600"
                      : task.status == "Pending"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                ></div>
                <h2 className="w-64">{task.title}</h2>
              </div>
              <h2
                className={`font-bold ${
                  task.priority == "High"
                    ? "text-red-500"
                    : task.priority == "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {task.priority}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
