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
    <div className="3xl:flex 3xl:flex-row 3xl:justify-center 3xl:gap-x-10 2xl:flex 2xl:flex-row 2xl:justify-center 2xl:gap-x-10 md:flex md:flex-row md:gap-x-10 md:justify-center xl:flex xl:flex-row xl:justify-center xl:gap-x-10 lg:flex lg:flex-row lg:gap-x-5 lg:justify-center mt-10 sm:flex sm:flex-col sm:gap-y-5">
      <div className="flex 3xl:gap-x-10 md:gap-x-10 sm:gap-x-4 sm:justify-center sm:items-center">
        <div
          className={`3xl:w-[200px] 2xl:w-[195px] xl:w-[191px] md:w-[185px] lg:w-[185px] 4xl:w-[260px] sm:w-fit h-fit 3xl:rounded-[40px] sm:rounded-3xl py-5 sm:px-5 ${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          }`}
        >
          <h1 className="text-center font-semibold 3xl:text-[19px] 2xl:text-[17px] xl:text-[16px] lg:text-[14px] md:text-[14px] 4xl:text-2xl sm:text-13 -mb-5">
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
              <div className="3xl:w-[9px] 3xl:h-[9px] sm:w-2 sm:h-2 bg-green-500 rounded-[4px]"></div>
              <h1 className="3xl:text-11 2xl:text-11 xl:text-11 md:text-10 4xl:text-14 sm:text-[8px]">
                Completed <span className="font-semibold">{completed ? completed.length : 0}</span>
              </h1>
            </div>
            <div className="flex gap-x-1 items-center">
              <div className="3xl:w-[9px] 3xl:h-[9px] sm:w-2 sm:h-2 bg-yellow-500 rounded-[4px]"></div>
              <h1 className="3xl:text-11 2xl:text-11 xl:text-11 md:text-10 4xl:text-14 sm:text-[8px]">
                Ongoing <span className="font-semibold">{inProgress ? inProgress.length : 0}</span>
              </h1>
            </div>
          </div>
        </div>
        <div
          className={` 3xl:w-[260px] 2xl:w-[230px] xl:w-[210px] lg:w-[207px] md:w-[205px] 4xl:w-[320px] sm:w-fit h-fit relative py-5 3xl:px-10 sm:px-5 3xl:rounded-[40px] sm:rounded-3xl ${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          }`}
        >
          <h1 className="text-center whitespace-nowrap font-semibold 3xl:text-[19px] 2xl:text-[17px] xl:text-[16px] lg:text-[14px] md:text-[14px] 4xl:text-2xl sm:text-13 pb-5 -mb-5">
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
          <div className="absolute  3xl:top-[43%] 3xl:left-[31%] xl:top-[43%] xl:left-[29%] lg:top-[43%] lg:left-[29%] sm:top-[45%] sm:left-[33%] md:top-[45%] md:left-[30%] font-semibold ">
            <h1 className="3xl:text-19 2xl:text-18 xl:text-18 lg:text-18 md:text-16 4xl:text-2xl sm:text-14 text-center">
              {Math.ceil(projectPercentage)}%
            </h1>
            <h1 className="3xl:text-11 xl:text-10 2xl:text-10 lg:text-10 md:text-[9px] 4xl:text-14 sm:text-[6px] text-center">
              Projects Completed
            </h1>
          </div>
        </div>
      </div>

      <div className="3xl:flex 3xl:flex-col 3xl:gap-y-5 2xl:flex 2xl:flex-col 2xl:gap-y-5 xl:flex xl:flex-col xl:gap-y-5 lg:flex lg:flex-col lg:gap-y-5 md:flex md:flex-col  md:gap-y-5 sm:flex sm:gap-x-2 sm:justify-center sm:items-center">
        <div
          className={`w-fit ${
            darkMode == "dark" ? "bg-myblack2" : "bg-white"
          } 3xl:p-5 xl:p-5 sm:p-3 3xl:rounded-[40px] sm:rounded-3xl h-fit`}
        >
          <div className="flex items-center justify-center 3xl:gap-x-3 sm:gap-x-1">
            <HiOutlineUsers className="3xl:w-6 3xl:h-6 sm:w-[14px] sm:h-[14px]" />
            <h1 className="3xl:text-[19px] 2xl:text-[17px] xl:text-[16px] lg:text-[14px] md:text-[14px] 4xl:text-2xl sm:text-13 font-semibold ">
              My Team
            </h1>
          </div>
          <h1 className="3xl:pt-5 sm:pt-2 3xl:text-12  2xl:text-12 xl:text-12 lg:text-11 md:text-11 4xl:text-15">
            Team Members
          </h1>
          <div className="flex -space-x-3 pt-1 items-center 3xl:ml-3 sm:ml-1 justify-center">
            {teams
              ? teams.members.map((member, index) =>
                  index >= 4 ? (
                    index == 4 ? (
                      <div
                        key={member.id}
                        className={`bg-anti-flash-white 3xl:text-19 font-bold  3xl:w-12 3xl:h-12 2xl:w-[46px] 2xl:h-[46px] xl:w-[44px] xl:h-[44px] lg:w-[40px] lg:h-[40px] 4xl:w-16 4xl:h-16 sm:w-8 sm:h-8 sm:text-14 rounded-full shadow-2xl border-2 flex items-center justify-center ${
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
                      className={`3xl:w-12 3xl:h-12 2xl:w-[46px] 2xl:h-[46px] xl:w-[44px] xl:h-[44px] lg:w-[40px] lg:h-[40px] 4xl:w-16 4xl:h-16 md:w-10 md:h-10 sm:w-8 sm:h-8 rounded-full  border-2 ${
                        darkMode == "dark" ? "border-myblack" : "border-white"
                      }`}
                    />
                  ) : (
                    <FaUserCircle
                      key={member.id}
                      className={`3xl:w-12 3xl:h-12 2xl:w-[46px] 2xl:h-[46px] xl:w-[44px] xl:h-[44px] lg:w-[40px] lg:h-[40px] 4xl:w-16 4xl:h-16 md:w-10 md:h-10 sm:w-8 sm:h-8  sm:rounded-full   border-2 ${
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
          } 3xl:p-5 sm:p-4 3xl:rounded-[40px] sm:rounded-3xl h-fit w-fit`}
        >
          <div className="flex items-center 3xl:gap-x-4 sm:gap-x-2">
            <MdError className="text-red-600 3xl:w-12 3xl:h-12 2xl:w-[46px] 2xl:h-[46px] xl:w-[44px] xl:h-[44px] lg:w-[40px] lg:h-[40px] md:w-10 md:h-10 4xl:w-16 4xl:h-16 sm:w-8 sm:h-8" />
            <div className="">
              <h1 className="3xl:text-19 2xl:text-18 xl:text-18 4xl:text-[27px] sm:text-18 font-semibold pl-4">
                {missedDeadline ? missedDeadline.length : 0}
              </h1>
              <h1 className="3xl:text-14 2xl:text-13 xl:text-13 4xl:text-17 sm:text-12 whitespace-nowrap">
                Missed Deadlines
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCards;
