import React from "react";
import { GoProject } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdAccessAlarm, MdAlarmOn } from "react-icons/md";

const TopCards = ({ all, completed, inProgress, projects }) => {
  return (
    <div className="flex justify-center gap-x-5 text-white pt-7">
      <div className="bg-gradient-to-r from-[#4a90e2]  to-[#79abfd]  p-5 w-fit h-fit rounded-[40px] flex  gap-x-5 items-center">
        <div className="bg-white text-[#4a90e2] rounded-full  p-1">
          <IoMdCheckmarkCircleOutline className=" w-9 h-9" />
        </div>
        <div className="">
          <h1 className="text-2xl pl-2 w-28 font-semibold">{all ? all.length : 0}</h1>
          <h1 className="">Total Task</h1>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#34c759] to-[#34d8a7] p-5 w-fit h-fit rounded-[40px] flex  gap-x-5 items-center">
        <div className="bg-white text-[#34c759] rounded-full  p-1">
          <MdAlarmOn className=" w-9 h-9" />
        </div>
        <div>
          <h1 className="text-2xl pl-2 w-28 font-semibold">{completed ? completed.length : 0}</h1>
          <h1 className=" ">Completed Task</h1>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#ffcc00] to-[#f4cd6c] p-5 w-fit h-fit rounded-[40px] flex  gap-x-5 items-center">
        <div className="bg-white text-[#ffcc00] rounded-full  p-1">
          <MdAccessAlarm className=" w-9 h-9" />
        </div>
        <div>
          <h1 className="text-2xl pl-2 w-28 font-semibold">{inProgress ? inProgress.length : 0}</h1>
          <h1 className=" ">Ongoing Task</h1>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#8e44ad] to-[#a595ff] p-5 w-fit h-fit rounded-[40px] flex  gap-x-5 items-center">
        <div className="bg-white text-[#8e44ad] rounded-full  p-1">
          <GoProject className=" w-9 h-9" />
        </div>
        <div>
          <h1 className="text-2xl pl-2 w-28 font-semibold">{projects ? projects.length : 0}</h1>
          <h1 className=" ">All Projects</h1>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
