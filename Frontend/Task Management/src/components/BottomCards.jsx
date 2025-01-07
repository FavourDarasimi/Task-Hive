import React, { useContext } from "react";
import { Context } from "../context/Context";
import { MdError } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
const BottomCards = ({
  circumference,
  circumference2,
  radius,
  radius2,
  offset1,
  offset2,
  completed,
  inProgress,
  projectradius,
  projectcircumference,
  projectOffset,
  projectPercentage,
  teams,
  missedDeadline,
}) => {
  const { darkMode } = useContext(Context);
  return (
    <div className="flex justify-center gap-x-10 mt-10">
      <div
        className={`w-60 h-fit   rounded-[40px] py-5 ${
          darkMode == "dark" ? "bg-myblack2" : "bg-white"
        }`}
      >
        <h1 className="text-center font-semibold text-[22px] -mb-5">Task Percentage</h1>
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
              Completed <span className="font-semibold">{completed ? completed.length : 0}</span>
            </h1>
          </div>
          <div className="flex gap-x-1 items-center">
            <div className="w-[10px] h-[10px] bg-yellow-500 rounded-[4px]"></div>
            <h1 className="text-14">
              Ongoing <span className="font-semibold">{inProgress ? inProgress.length : 0}</span>
            </h1>
          </div>
        </div>
      </div>
      <div
        className={` w-80 h-fit relative py-5 px-10 rounded-[40px] ${
          darkMode == "dark" ? "bg-myblack2" : "bg-white"
        }`}
      >
        <h1 className="text-center font-semibold text-[22px] pb-5 -mb-5">Projects Completed</h1>
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={projectradius} fill="none" stroke="#ddd" strokeWidth="15" />
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
        <div className="absolute  top-[45%] left-[31%] font-semibold text-lg">
          <h1 className="text-19 text-center">{Math.ceil(projectPercentage)}%</h1>
          <h1 className="text-14">Projects Completed</h1>
        </div>
      </div>

      <div className="flex flex-col gap-y-5">
        <div
          className={` ${darkMode == "dark" ? "bg-myblack2" : "bg-white"} p-5 rounded-[40px] h-fit`}
        >
          <div className="flex items-center justify-center gap-x-3">
            <HiOutlineUsers className="w-6 h-6" />
            <h1 className="text-[22px] font-semibold ">My Team</h1>
          </div>
          <h1 className="pt-5 text-15">Team Members</h1>
          <div className="flex -space-x-3 pt-1">
            {teams
              ? teams.members.map((member, index) => (
                  <div key={member.id}>
                    {index >= 4 ? (
                      index == 4 ? (
                        <div
                          className={`bg-anti-flash-white text-19 font-bold  w-14 h-14 rounded-full border-4 flex items-center justify-center ${
                            darkMode == "dark" ? "text-black border-myblack" : "border-white"
                          }`}
                        >
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
                    )}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div
          className={` ${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } p-5 rounded-[40px] h-fit w-fit`}
        >
          <div className="flex items-center gap-x-4">
            <MdError className="text-red-600 w-14 h-14" />
            <div className="">
              <h1 className="text-2xl font-semibold pl-4">
                {missedDeadline ? missedDeadline.length : 0}
              </h1>
              <h1 className="text-16">Missed Deadlines</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCards;
