import React from "react";
import { GoProject } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdAccessAlarm, MdAlarmOn } from "react-icons/md";

const TopCards = ({ all, completed, inProgress, projects }) => {
  return (
    <div className="lg:flex lg:justify-center lg:gap-x-5 text-white pt-7 sm:grid sm:grid-cols-2 sm:gap-y-4 sm:gap-x-4 ">
      <div className="bg-gradient-to-r from-[#4a90e2]  to-[#79abfd]  lg:p-5 sm:p-4 w-fit h-fit lg:rounded-[40px] sm:rounded-3xl flex sm:gap-x-2 lg:gap-x-5 items-center ">
        <div className="bg-white text-[#4a90e2] rounded-full  p-1">
          <IoMdCheckmarkCircleOutline className=" lg:w-9 lg:h-9 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="lg:text-2xl sm:text-15 pl-2 lg:w-28 sm:w-[67px] font-semibold">
            {all ? all.length : 0}
          </h1>
          <h1 className="sm:text-10 lg:text-16">Total Task</h1>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#34c759] to-[#34d8a7] lg:p-5 sm:p-4 w-fit h-fit lg:rounded-[40px] sm:rounded-3xl flex sm:gap-x-2 lg:gap-x-5 items-center">
        <div className="bg-white text-[#34c759] rounded-full  p-1">
          <MdAlarmOn className=" lg:w-9 lg:h-9 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="lg:text-2xl sm:text-15 pl-2 lg:w-28 sm:w-[67px] font-semibold">
            {completed ? completed.length : 0}
          </h1>
          <h1 className="sm:text-10 lg:text-16">Completed Task</h1>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#ffcc00] to-[#f4cd6c] lg:p-5 sm:p-4 w-fit h-fit lg:rounded-[40px] sm:rounded-3xl flex sm:gap-x-2 lg:gap-x-5 items-center">
        <div className="bg-white text-[#ffcc00] rounded-full  p-1">
          <MdAccessAlarm className=" lg:w-9 lg:h-9 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="lg:text-2xl sm:text-15 pl-2 lg:w-28 sm:w-[67px] font-semibold">
            {inProgress ? inProgress.length : 0}
          </h1>
          <h1 className="sm:text-10 lg:text-16">Ongoing Task</h1>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#8e44ad] to-[#a595ff] lg:p-5 sm:p-4 w-fit h-fit lg:rounded-[40px] sm:rounded-3xl flex sm:gap-x-2 lg:gap-x-5 items-center">
        <div className="bg-white text-[#8e44ad] rounded-full  p-1">
          <GoProject className=" lg:w-9 lg:h-9 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="lg:text-2xl sm:text-15 pl-2 lg:w-28 sm:w-[67px] font-semibold">
            {projects ? projects.length : 0}
          </h1>
          <h1 className="sm:text-10 lg:text-16">All Projects</h1>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
