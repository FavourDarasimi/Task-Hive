import React from "react";
import { GoProject } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdAccessAlarm, MdAlarmOn } from "react-icons/md";

const TopCards = ({ all, completed, inProgress, projects }) => {
  return (
    <div className="3xl:flex 3xl:justify-center 3xl:gap-x-5 2xl:flex 2xl:justify-center 2xl:gap-x-4 xl:flex xl:justify-center xl:gap-x-4 lg:flex lg:justify-center lg:gap-x-2 md:flex md:justify-center md:gap-x-5 text-white pt-7 sm:grid sm:grid-cols-2 sm:gap-y-4 sm:gap-x-4 ">
      <div className="bg-gradient-to-r from-[#4a90e2]  to-[#79abfd]  3xl:p-5 4xl:p-7 sm:p-4 w-fit h-fit 3xl:rounded-[30px] 2xl:rounded-[30px] sm:rounded-3xl flex sm:gap-x-2 3xl:gap-x-5 items-center ">
        <div className="bg-white text-[#4a90e2] rounded-full  p-1">
          <IoMdCheckmarkCircleOutline className=" 3xl:w-7 3xl:h-7 2xl:w-7 2xl:h-7 xl:w-7 xl:h-7 lg:w-7 lg:h-7 md:w-7 md:h-7   sm:w-6 sm:h-6 4xl:w-10 4xl:h-10" />
        </div>
        <div>
          <h1 className="3xl:text-xl 2xl:text-xl xl:text-19 sm:text-15 4xl:text-[27px] lg:text-18 md:text-18  pl-2 3xl:w-[94px] xl:w-[82px] lg:w-[78px] 2xl:w-[94px] md:w-[75px] sm:w-[67px] font-semibold">
            {all ? all.length : 0}
          </h1>
          <h1 className="sm:text-10 3xl:text-14 2xl:text-13 xl:text-12 lg:text-11 md:text-11 4xl:text-16">
            Total Task
          </h1>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#34c759] to-[#34d8a7] 3xl:p-5 4xl:p-7 sm:p-4 w-fit h-fit 3xl:rounded-[30px] 2xl:rounded-[30px] sm:rounded-3xl flex sm:gap-x-2 3xl:gap-x-5 items-center">
        <div className="bg-white text-[#34c759] rounded-full  p-1">
          <MdAlarmOn className=" 3xl:w-7 3xl:h-7 2xl:w-7 2xl:h-7 xl:w-7 xl:h-7 lg:w-7 lg:h-7 md:w-7 md:h-7  sm:w-6 sm:h-6 4xl:w-10 4xl:h-10" />
        </div>
        <div>
          <h1 className="3xl:text-xl 2xl:text-xl xl:text-19 sm:text-15 4xl:text-[27px] lg:text-18 md:text-18  pl-2 3xl:w-[94px] xl:w-[82px] lg:w-[78px] 2xl:w-[94px] md:w-[75px] sm:w-[67px] font-semibold">
            {completed ? completed.length : 0}
          </h1>
          <h1 className="sm:text-10 3xl:text-14 2xl:text-13 xl:text-12 lg:text-11 md:text-11 4xl:text-16">
            Completed Task
          </h1>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#ffcc00] to-[#f4cd6c] 3xl:p-5 4xl:p-7 sm:p-4 w-fit h-fit 3xl:rounded-[30px] 2xl:rounded-[30px] sm:rounded-3xl flex sm:gap-x-2 3xl:gap-x-5 items-center">
        <div className="bg-white text-[#ffcc00] rounded-full  p-1">
          <MdAccessAlarm className=" 3xl:w-7 3xl:h-7 2xl:w-7 2xl:h-7 xl:w-7 xl:h-7 lg:w-7 lg:h-7 md:w-7 md:h-7  sm:w-6 sm:h-6 4xl:w-10 4xl:h-10" />
        </div>
        <div>
          <h1 className="3xl:text-xl 2xl:text-xl xl:text-19 sm:text-15 4xl:text-[27px] lg:text-18 md:text-18  pl-2 3xl:w-[94px] xl:w-[82px] lg:w-[78px] 2xl:w-[94px] md:w-[75px] sm:w-[67px] font-semibold">
            {inProgress ? inProgress.length : 0}
          </h1>
          <h1 className="sm:text-10 3xl:text-14 2xl:text-13 xl:text-12 lg:text-11 md:text-11 4xl:text-16">
            Ongoing Task
          </h1>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#8e44ad] to-[#a595ff] 3xl:p-5 4xl:p-7 sm:p-4 w-fit h-fit 3xl:rounded-[30px] 2xl:rounded-[30px] sm:rounded-3xl flex sm:gap-x-2 3xl:gap-x-5 items-center">
        <div className="bg-white text-[#8e44ad] rounded-full  p-1">
          <GoProject className=" 3xl:w-7 3xl:h-7 2xl:w-7 2xl:h-7 xl:w-7 xl:h-7 lg:w-7 lg:h-7 md:w-7 md:h-7  sm:w-6 sm:h-6 4xl:w-10 4xl:h-10" />
        </div>
        <div>
          <h1 className="3xl:text-xl 2xl:text-xl xl:text-19 sm:text-15 4xl:text-[27px] lg:text-18 md:text-18  pl-2 3xl:w-[94px] xl:w-[82px] lg:w-[78px] 2xl:w-[94px] md:w-[75px] sm:w-[67px] font-semibold">
            {projects ? projects.length : 0}
          </h1>
          <h1 className="sm:text-10 3xl:text-14 2xl:text-13 xl:text-12 lg:text-11 md:text-11 4xl:text-16">
            All Projects
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
