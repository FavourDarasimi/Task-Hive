import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAddToPhotos } from "react-icons/md";

const EditTask = ({ task, setShowEdit }) => {
  const { darkMode, updateTask } = useContext(Context);
  const [title, setTitle] = useState();
  const [priority, setPriority] = useState();

  useEffect(() => {
    setPriority(task.priority);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTask(task.id, title, priority);
      setShowEdit(false);
      setPriority();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" fixed z-10 inset-0  bg-black w-100%  bg-opacity-50 grid place-items-center">
      <form
        className={` rounded-3xl  ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } 3xl:w-25% sm:w-90% h-fit  fixed`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="w-full flex justify-end  pt-3 pr-3 ">
          <RxCross1 onClick={() => setShowEdit(false)} className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-y-3 3xl:px-8 sm:px-5 3xl:pb-10 sm:pb-5">
          <div className="flex gap-x-1 items-center justify-center">
            <div className="bg-blue-300 p-1 rounded-3xl">
              <MdOutlineAddToPhotos className="3xl:w-7 3xl:h-7 sm:w-5 sm:h-5 text-blue-600 " />
            </div>
            <h1 className="text-center 3xl:text-2xl sm:text-18 font-semibold">UPDATE PROJECT</h1>
          </div>{" "}
          <div className="flex flex-col">
            <label className="font-semibold 3xl:text-16 sm:text-xs pb-1">Title</label>
            <input
              name="first_name"
              value={title || task.title}
              type="text"
              className={`  border-1 rounded-xl p-2 sm:text-xs 3xl:text-16 w-full  3xl:h-14 sm:h-12 outline-none ${
                darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
              } focus:border-blue-500 focus:border-2`}
              placeholder="Not Provided"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold 3xl:text-16 sm:text-xs pb-1">Priority</label>

            <div className="flex gap-x-3">
              <label class="cursor-pointer w-full">
                <input
                  name="priority"
                  type="radio"
                  class="peer sr-only"
                  onChange={(e) => setPriority("Low")}
                  checked={priority == "Low" ? true : false}
                />
                <div class="rounded-xl border-1 text-17 border-gray-300 h-14 flex gap-x-1 w-full items-center justify-center py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-green-600 peer-checked:ring-green-600 peer-checked:ring-offset-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>Low
                </div>
              </label>
              <label class="cursor-pointer w-full">
                <input
                  name="priority"
                  type="radio"
                  class="peer sr-only"
                  onChange={(e) => setPriority("Medium")}
                  checked={priority == "Medium" ? true : false}
                />
                <div class="rounded-xl border-1 text-17 border-gray-300 h-14 flex gap-x-1 w-full items-center justify-center py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-yellow-600 peer-checked:ring-yellow-600 peer-checked:ring-offset-2">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>Medium
                </div>
              </label>
              <label class="cursor-pointer w-full">
                <input
                  name="priority"
                  type="radio"
                  class="peer sr-only"
                  onChange={(e) => setPriority("High")}
                  checked={priority == "High" ? true : false}
                />
                <div class="rounded-xl border-1 text-17 border-gray-300 h-14 flex gap-x-1 w-full items-center justify-center py-5 px-3 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-red-600 peer-checked:ring-red-600 peer-checked:ring-offset-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>High
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white py-2 px-3 sm:w-fit md:w-fit rounded-3xl bg-dark-white 3xl:w-fit text-16 font-semibold bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
