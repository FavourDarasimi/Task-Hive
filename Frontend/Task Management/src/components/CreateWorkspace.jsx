import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import cancel from "../assets/icons8-cross-24.png";

const CreateWorkspace = ({ setShowCreateWorkspace }) => {
  const { createWorkspace, darkMode } = useContext(Context);
  const [name, setName] = useState("");

  const handleSubmit = async (e, name) => {
    e.preventDefault();
    try {
      const response = await createWorkspace(name);
      setShowCreateWorkspace(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" fixed z-20 inset-0  bg-black w-100%   bg-opacity-50 grid place-items-center  ">
      <form
        className={` rounded-3xl  ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } lg:w-25% sm:w-90% h-fit  fixed`}
        onSubmit={(e) => {
          handleSubmit(e, name);
        }}
      >
        <div className="w-full flex justify-end pt-4 pr-4 ">
          <img
            src={cancel}
            alt=""
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowCreateWorkspace(false)}
          />
        </div>
        <div className="flex flex-col gap-y-3 lg:px-8 sm:px-5 lg:pb-10 sm:pb-5">
          <div className="flex gap-x-1 items-center justify-center">
            <h1 className="text-center lg:text-2xl sm:text-18 font-semibold">ADD NEW WORKSPACE</h1>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold lg:text-16 sm:text-14 pb-2">Name</label>
            <input
              type="text"
              className={`sm:text-xs lg:text-16  border-1 rounded-xl p-2 w-full  lg:h-14 sm:h-11 outline-none ${
                darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
              }`}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white py-2 px-3 sm:w-fit md:w-fit rounded-lg bg-dark-white lg:w-fit text-16 font-semibold bg-blue-600"
            >
              New Workspace
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkspace;
