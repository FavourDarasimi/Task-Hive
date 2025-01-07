import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAddToPhotos } from "react-icons/md";

const EditProject = ({ project, setShowEdit }) => {
  const { darkMode, updateProject } = useContext(Context);

  const [title, setTitle] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProject(project.id, title);
      setShowEdit(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" fixed z-10 inset-0  bg-black w-100%  bg-opacity-20 grid place-items-center">
      <form
        className={` rounded-3xl  ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } lg:w-25% sm:w-90% h-fit  fixed`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="w-full flex justify-end  pt-3 pr-3 ">
          <RxCross1 onClick={() => setShowEdit(false)} className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-y-3 lg:px-8 sm:px-5 lg:pb-10 sm:pb-5">
          <div className="flex gap-x-1 items-center justify-center">
            <div className="bg-blue-300 p-1 rounded-lg">
              <MdOutlineAddToPhotos className="lg:w-7 lg:h-7 sm:w-5 sm:h-5 text-blue-600 " />
            </div>
            <h1 className="text-center lg:text-2xl sm:text-18 font-semibold">UPDATE PROJECT</h1>
          </div>{" "}
          <div className="flex flex-col">
            <label className="font-semibold lg:text-16 sm:text-xs pb-1">Title</label>
            <input
              name="first_name"
              value={title || project.name}
              type="text"
              className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-12 outline-none ${
                darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
              } focus:border-blue-500 focus:border-2`}
              placeholder="Not Provided"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white py-2 px-3 sm:w-fit md:w-fit rounded-lg bg-dark-white lg:w-fit text-16 font-semibold bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
