import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Calendar } from "react-calendar";
import "./Calendar.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdAccessAlarm, MdAlarmOn } from "react-icons/md";
import { GoProject } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";

const DashBoard = () => {
  const {
    getTaskDueToday,
    getOnlineMembers,
    getTaskStatus,
    user,
    getDate,
    darkMode,
    username,
    getUserWorkspaces,
  } = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [all, setAll] = useState([]);
  const [upcoming, setUpComing] = useState([]);
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [teams, setTeams] = useState();
  const [activeWorkspace, setActiveWorkspace] = useState();
  const [offset1, setOffset1] = useState();
  const [offset2, setOffset2] = useState();
  const [projectOffset, setProjectOffset] = useState();
  const [projectPercentage, setProjectPercentage] = useState();

  const radius = 35; // Radius of the circle
  const circumference = 2 * Math.PI * radius;

  const radius2 = 25; // Radius of the circle
  const circumference2 = 2 * Math.PI * radius2;

  const projectradius = 40; // Radius of the circle
  const projectcircumference = 2 * Math.PI * projectradius;

  useEffect(() => {
    const getDueTask = async () => {
      try {
        const response = await getTaskDueToday();
        setTasks(response);
      } catch (error) {
        console.log(error);
      }
    };

    const getStatus = async () => {
      try {
        const response = await getTaskStatus();
        const ongoingPercentage = (response.in_progress.length / response.all.length) * 100;
        const ongoingOffset = circumference2 - (ongoingPercentage / 100) * circumference2;
        setOffset2(ongoingOffset);

        const completedPercentage = (response.completed.length / response.all.length) * 100;
        const completedOffset = circumference - (completedPercentage / 100) * circumference;
        setOffset1(completedOffset);

        const completedProjects = response.projects.filter(
          (project) => project.status == "Completed"
        );
        const projectCompletedPercentage =
          (completedProjects.length / response.projects.length) * 100;
        const projectOffset =
          projectcircumference - (projectCompletedPercentage / 100) * projectcircumference;
        setProjectOffset(projectOffset);
        setProjectPercentage(projectCompletedPercentage);

        setAll(response.all);
        setCompleted(response.completed);
        setProjects(response.projects);
        setInProgress(response.in_progress);
        setUpComing(response.upcoming);
        setTeams(response.team);
      } catch (error) {
        console.log(error);
      }
    };
    const getWorkspaces = async () => {
      try {
        const response = await getUserWorkspaces();

        setActiveWorkspace(response.active);
      } catch (error) {
        console.log(error);
      }
    };
    getWorkspaces();
    getDueTask();
    getStatus();
  }, []);

  const getFirstLetter = (letter) => {
    const first_letter = letter[0].toUpperCase();
    return first_letter;
  };
  const getNewName = (name) => {
    const newName = name.charAt(0).toUpperCase() + name.slice(1);
    return newName;
  };

  const even = (num) => {
    return num % 2 == 0;
  };

  return (
    <div className={`${darkMode == "dark" ? "text-anti-flash-white " : ""}`}>
      <div className="flex gap-x-10">
        <div className="w-65%">
          <h1 className="lg:text-18 sm:text-14 font-bold ">
            Hello {getNewName(username)} &#128512; ({activeWorkspace ? activeWorkspace.name : ""})
          </h1>
          <div className="flex justify-center gap-x-5 text-white pt-7">
            <div className="bg-gradient-to-r from-[#4a90e2]  to-[#79abfd]  p-5 w-fit h-fit rounded-[40px] flex  gap-x-5 items-center">
              <div className="bg-white text-[#4a90e2] rounded-full  p-1">
                <IoMdCheckmarkCircleOutline className=" w-10 h-10" />
              </div>
              <div className="">
                <h1 className="text-3xl pl-2 w-28">{all ? all.length : 0}</h1>
                <h1 className="">Total Task</h1>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#34c759] to-[#34d8a7] p-5 w-fit h-fit rounded-[40px] flex  gap-x-5 items-center">
              <div className="bg-white text-[#34c759] rounded-full  p-1">
                <MdAlarmOn className=" w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl pl-2 w-28">{completed ? completed.length : 0}</h1>
                <h1 className=" ">Completed Task</h1>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#ffcc00] to-[#f4cd6c] p-5 w-fit h-fit rounded-[40px] flex  gap-x-5 items-center">
              <div className="bg-white text-[#ffcc00] rounded-full  p-1">
                <MdAccessAlarm className=" w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl pl-2 w-28">{inProgress ? inProgress.length : 0}</h1>
                <h1 className=" ">Ongoing Task</h1>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#8e44ad] to-[#a595ff] p-5 w-fit h-fit rounded-[40px] flex  gap-x-5 items-center">
              <div className="bg-white text-[#8e44ad] rounded-full  p-1">
                <GoProject className=" w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl pl-2 w-28">{projects ? projects.length : 0}</h1>
                <h1 className=" ">All Projects</h1>
              </div>
            </div>
          </div>
          <div className="flex gap-x-5 mt-10">
            <div className="w-60 h-fit  bg-white rounded-3xl py-5">
              <h1 className="text-center font-semibold text-2xl">Task Percentage</h1>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#ddd" strokeWidth="3" />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset1}
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                  strokeLinecap="round"
                />
                <circle cx="50" cy="50" r={radius2} fill="none" stroke="#ddd" strokeWidth="3" />
                <circle
                  cx="50"
                  cy="50"
                  r={radius2}
                  fill="none"
                  stroke="#eab208"
                  strokeWidth="3"
                  strokeDasharray={circumference2}
                  strokeDashoffset={offset2}
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex gap-x-3 justify-center">
                <div className="flex gap-x-1 items-center">
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-[4px]"></div>
                  <h1 className="text-14">
                    Completed{" "}
                    <span className="font-semibold">{completed ? completed.length : 0}</span>
                  </h1>
                </div>
                <div className="flex gap-x-1 items-center">
                  <div className="w-[10px] h-[10px] bg-yellow-500 rounded-[4px]"></div>
                  <h1 className="text-14">
                    Ongoing{" "}
                    <span className="font-semibold">{inProgress ? inProgress.length : 0}</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-white w-80 h-fit relative py-5 px-10 rounded-3xl">
              <h1 className="text-center font-semibold text-2xl pb-5">Projects Completed</h1>
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={projectradius}
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="15"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={projectradius}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="15"
                  strokeDasharray={projectcircumference}
                  strokeDashoffset={projectOffset}
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                />
              </svg>
              <div className="absolute  top-[45%] left-[28%] font-semibold text-lg">
                <h1 className="text-xl text-center">{Math.ceil(projectPercentage)}%</h1>
                <h1 className="text-16">Projects Completed</h1>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl">
              <div className="flex items-center gap-x-3">
                <HiOutlineUsers className="w-7 h-7" />
                <h1 className="text-2xl font-semibold ">My Team</h1>
              </div>
              <h1 className="pt-5 text-16">Team Members</h1>
              <div className="flex -space-x-3 pt-1">
                {teams
                  ? teams.members.map((member, index) =>
                      index >= 4 ? (
                        index == 4 ? (
                          <div className="bg-white text-17 font-bold shadow-2xl w-14 h-14 rounded-full flex items-center justify-center">
                            +{teams.members.length - index}
                          </div>
                        ) : (
                          ""
                        )
                      ) : member.profile.avatar ? (
                        <img
                          src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                          className={`lg:w-14 lg:h-14 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                            darkMode == "dark" ? "border-myblack" : "border-white"
                          }`}
                        />
                      ) : (
                        <FaUserCircle
                          className={`lg:w-14 lg:h-14 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                            darkMode == "dark" ? "border-myblack" : "border-white"
                          }`}
                        />
                      )
                    )
                  : ""}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <Calendar
              className={`${darkMode == "dark text-green-500" ? "bg-myblack2" : "bg-white"}`}
            />
          </div>
          <div className="flex flex-col items-center pt-10">
            <h1 className="text-2xl font-semibold">Upcoming Deadlines</h1>
            <div className="flex gap-x-3 pt-3">
              <div className="flex gap-x-1 items-center">
                <div className="w-3 h-3 bg-green-500 rounded-[4px]"></div>
                <h1 className="text-15">Low Priority</h1>
              </div>
              <div className="flex gap-x-1 items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-[4px]"></div>
                <h1 className="text-15">Medium Priority</h1>
              </div>
              <div className="flex gap-x-1 items-center">
                <div className="w-3 h-3 bg-red-500 rounded-[4px]"></div>
                <h1 className="text-15">High Priority</h1>
              </div>
            </div>
            <div className="flex flex-col gap-y-7 pt-5">
              {upcoming.map((task, index) =>
                !even(index) ? (
                  <div
                    className={`bg-white ml-24 p-4 w-fit border-l-[5px] rounded-r-2xl ${
                      task.priority == "High"
                        ? "border-l-red-600"
                        : task.priority == "Medium"
                        ? "border-l-yellow-600"
                        : "border-l-green-600"
                    }`}
                  >
                    <h1 className="font-semibold">{task.title}</h1>
                    <h1 className="text-14">{getDate(task.due_date)}</h1>
                  </div>
                ) : (
                  <div
                    className={`bg-white p-4 w-fit border-l-[5px] rounded-r-2xl ${
                      task.priority == "High"
                        ? "border-l-red-600"
                        : task.priority == "Medium"
                        ? "border-l-yellow-600"
                        : "border-l-green-600"
                    }`}
                  >
                    <h1 className="font-semibold">{task.title}</h1>
                    <h1 className="text-14">{getDate(task.due_date)}</h1>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
