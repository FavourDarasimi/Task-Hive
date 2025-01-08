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
    <div className="lg:flex lg:flex-row lg:justify-center lg:gap-x-10 mt-10 sm:flex sm:flex-col sm:gap-y-5">
      <div className="flex lg:gap-x-10 sm:gap-x-4 sm:justify-center sm:items-center">
        <div
          className={`lg:w-60 sm:w-fit h-fit lg:rounded-[40px] sm:rounded-3xl py-5 sm:px-5 ${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          }`}
        >
          <h1 className="text-center font-semibold lg:text-[22px] sm:text-13 -mb-5">
            Task Percentage
          </h1>
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
          <div className="flex gap-x-3 justify-center ">
            <div className="flex gap-x-1 items-center">
              <div className="lg:w-[9px] lg:h-[9px] sm:w-2 sm:h-2 bg-green-500 rounded-[4px]"></div>
              <h1 className="lg:text-14 sm:text-[8px]">
                Completed <span className="font-semibold">{completed ? completed.length : 0}</span>
              </h1>
            </div>
            <div className="flex gap-x-1 items-center">
              <div className="lg:w-[9px] lg:h-[9px] sm:w-2 sm:h-2 bg-yellow-500 rounded-[4px]"></div>
              <h1 className="lg:text-14 sm:text-[8px]">
                Ongoing <span className="font-semibold">{inProgress ? inProgress.length : 0}</span>
              </h1>
            </div>
          </div>
        </div>
        <div
          className={` lg:w-80 sm:w-fit h-fit relative py-5 lg:px-10 sm:px-5 lg:rounded-[40px] sm:rounded-3xl ${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          }`}
        >
          <h1 className="text-center whitespace-nowrap font-semibold lg:text-[22px] sm:text-13 pb-5 -mb-5">
            Projects Completed
          </h1>
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
          <div className="absolute  lg:top-[45%] lg:left-[31%] sm:top-[45%] sm:left-[33%] font-semibold ">
            <h1 className="lg:text-19 sm:text-14 text-center">{Math.ceil(projectPercentage)}%</h1>
            <h1 className="lg:text-14 sm:text-[6px] text-center">Projects Completed</h1>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:flex-col lg:gap-y-5 sm:flex sm:gap-x-2 sm:justify-center sm:items-center">
        <div
          className={`w-fit ${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } lg:p-5 sm:p-3 lg:rounded-[40px] sm:rounded-3xl h-fit`}
        >
          <div className="flex items-center justify-center lg:gap-x-3 sm:gap-x-1">
            <HiOutlineUsers className="lg:w-6 lg:h-6 sm:w-[14px] sm:h-[14px]" />
            <h1 className="lg:text-[22px] sm:text-13 font-semibold ">My Team</h1>
          </div>
          <h1 className="lg:pt-5 sm:pt-2 text-12">Team Members</h1>
          <div className="flex -space-x-3 pt-1 items-center lg:ml-3 sm:ml-1">
            {teams
              ? teams.members.map((member, index) =>
                  index >= 4 ? (
                    index == 4 ? (
                      <div
                        key={member.id}
                        className={`bg-anti-flash-white lg:text-19 font-bold  lg:w-14 lg:h-14 sm:w-8 sm:h-8 sm:text-14 rounded-full shadow-2xl border-2 flex items-center justify-center ${
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
                      key={member.id}
                      src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                      className={`lg:w-14 lg:h-14 md:w-44 md:h-44 sm:w-8 sm:h-8 rounded-full  border-2 ${
                        darkMode == "dark" ? "border-myblack" : "border-white"
                      }`}
                    />
                  ) : (
                    <FaUserCircle
                      key={member.id}
                      className={`lg:w-14 lg:h-14 md:w-44 md:h-44 sm:w-8 sm:h-8  sm:rounded-full   border-2 ${
                        darkMode == "dark" ? "border-myblack" : "border-white"
                      }`}
                    />
                  )
                )
              : ""}
          </div>
        </div>
        <div
          className={` ${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } lg:p-5 sm:p-4 lg:rounded-[40px] sm:rounded-3xl h-fit w-fit`}
        >
          <div className="flex items-center lg:gap-x-4 sm:gap-x-2">
            <MdError className="text-red-600 lg:w-14 lg:h-14 sm:w-8 sm:h-8" />
            <div className="">
              <h1 className="lg:text-2xl sm:text-18 font-semibold pl-4">
                {missedDeadline ? missedDeadline.length : 0}
              </h1>
              <h1 className="lg:text-16 sm:text-12 whitespace-nowrap">Missed Deadlines</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCards;
