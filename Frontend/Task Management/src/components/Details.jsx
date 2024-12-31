import React from "react";
import { CgDetailsMore } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";

const Details = () => {
  return (
    <div className="pt-5 ">
      <div className="py-2 px-5 rounded-lg w-fit bg-white flex gap-x-1 justify-center items-center border-b-4 border-yellow-500">
        <CgDetailsMore className="w-6 h-6" />
        <h1 className=" text-17 font-semibold">Details</h1>
      </div>
      <div className="flex justify-between pt-5">
        <button className="bg-yellow-600 rounded-lg p-2 text-15 text-white flex items-center gap-x-1 font-bold">
          <FaPlus />
          Start
        </button>
        <button className="bg-yellow-600 rounded-lg p-2 text-15 text-white flex items-center gap-x-1 font-bold">
          <FaPlus />
          Team
        </button>
      </div>
      <div className="bg-white p-10 w-fit rounded-lg mt-3">
        <div className="flex gap-x-2 items-center">
          <div className="bg-green-600 h-4 w-4 rounded-full"></div>
          <h1 className="text-2xl font-semibold">DashBoard Design</h1>
          <h1 className="text-yellow-600 text-xl font-semibold pl-3">Medium</h1>
        </div>
        <h1 className="pt-4 ">This Task is to Create the Design of the Dashboard</h1>
        <div className="pt-10">
          <h1 className="text-19 font-semibold pb-4">Task Team</h1>
          <div className="flex items-center gap-x-2 py-5 border-b-1 border-mygrey">
            <div className="bg-yellow-500 p-3 w-fit rounded-full text-white font-bold">DO</div>
            <div>
              <h1 className="text-16 font-semibold">Darasimi Olaniran</h1>
              <h1 className="text-14 text-gray-400">Leader</h1>
            </div>
          </div>

          <div className="flex items-center gap-x-2 py-5 border-b-1 border-mygrey">
            <div className="bg-yellow-500 p-3 w-fit rounded-full text-white font-bold">DO</div>
            <div>
              <h1 className="text-16 font-semibold">Darasimi Olaniran</h1>
              <h1 className="text-14 text-gray-400">Member</h1>
            </div>
          </div>

          <div className="flex items-center gap-x-2 py-5 border-b-1 border-mygrey">
            <div className="bg-yellow-500 p-3 w-fit rounded-full text-white font-bold">DO</div>
            <div>
              <h1 className="text-16 font-semibold">Darasimi Olaniran</h1>
              <h1 className="text-14 text-gray-400">Member</h1>
            </div>
          </div>

          <div className="flex items-center gap-x-2 py-5 border-b-1 border-mygrey">
            <div className="bg-yellow-500 p-3 w-fit rounded-full text-white font-bold">DO</div>
            <div>
              <h1 className="text-16 font-semibold">Darasimi Olaniran</h1>
              <h1 className="text-14 text-gray-400">Member</h1>
            </div>
          </div>
        </div>
        <div className="pt-10 flex flex-col items-center">
          <div className="flex items-center  gap-x-2">
            <h1 className="text-16 font-semibold">Created:</h1>
            <h1 className="text-14">5th December,2024</h1>
          </div>

          <div className="flex items-center text-red-600 gap-x-1 pt-4">
            <h1 className="text-16 font-semibold">Deadline:</h1>
            <h1 className="text-14">25th December,2024</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
