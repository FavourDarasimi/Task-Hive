import React, { useContext } from "react";
import { Context } from "../context/Context";
import { FaUserCircle } from "react-icons/fa";

const AssignMembersToTask = ({
  setParam,
  param,
  task,
  searchedMembers,
  selectedMembers,
  selectedMembersId,
  remove,
  removeSelectedUser,
  cancel,
  setAddedUser,
}) => {
  const { darkMode, addMemberToTask } = useContext(Context);

  const done = async () => {
    try {
      const response = await addMemberToTask(task.id, selectedMembersId);
      setAddedUser(selectedMembersId);
      cancel();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute transition duration-500 bg-white z-1 shadow-2xl p-5 w-fit rounded-lg left-0 mt-[90px] ">
      <h1 className="text-15">Assign to</h1>
      <input
        onChange={(e) => setParam(e.target.value)}
        className="h-8 w-[234px] outline-none focus:border-2 text-14 font-[400] focus:border-blue-500 placeholder:font-[400] pl-3 rounded-md mt-3 border-1 border-gray-300"
        placeholder="Search user"
      />
      <div className="mt-4">
        {param ? (
          searchedMembers && searchedMembers.length > 0 ? (
            searchedMembers.map((user) => (
              <div
                className={`cursor-pointer flex gap-x-1 items-center rounded-md border-1 border-gray-300 py-2 ${
                  selectedMembersId.includes(user.id) ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => remove(user)}
              >
                {user.profile.avatar ? (
                  <img
                    key={user.id}
                    src={`http://127.0.0.1:8000/${user.profile.avatar}`}
                    className={`lg:w-6 lg:h-6 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded-full lg:ml-3 border-1 ${
                      darkMode == "dark" ? "border-myblack" : "border-white"
                    }`}
                  />
                ) : (
                  <FaUserCircle
                    key={user.id}
                    className={`lg:w-6 lg:h-6 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded-full lg:ml-3 border-1 ${
                      darkMode == "dark" ? "border-myblack" : "border-white"
                    }`}
                  />
                )}
                <div className="flex gap-x-1 text-13 font-[400]">
                  <h1>{user.first_name}</h1>
                  <h1>{user.last_name}</h1>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-14 text-center">No User Matches Your prompt</h1>
          )
        ) : (
          selectedMembers.map((user) => (
            <div
              className={`cursor-pointer flex justify-between items-center px-3 rounded-md border-1 border-gray-300 py-2 ${
                selectedMembersId.includes(user.id) ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => removeSelectedUser(user)}
            >
              <div className="flex gap-x-1">
                {user.profile.avatar ? (
                  <img
                    key={user.id}
                    src={`http://127.0.0.1:8000/${user.profile.avatar}`}
                    className={`lg:w-6 lg:h-6 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded-full  border-1 ${
                      darkMode == "dark" ? "border-myblack" : "border-white"
                    }`}
                  />
                ) : (
                  <FaUserCircle
                    key={user.id}
                    className={`lg:w-6 lg:h-6 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded-full  border-1 ${
                      darkMode == "dark" ? "border-myblack" : "border-white"
                    }`}
                  />
                )}
                <div className="flex gap-x-1 text-13 font-[400]">
                  <h1>{user.first_name}</h1>
                  <h1>{user.last_name}</h1>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-5 flex gap-x-4">
        <button
          className="bg-blue-500 text-white px-3 py-1 text-15 rounded-[4px] font-[400]"
          onClick={() => done()}
        >
          Done
        </button>
        <button
          onClick={() => cancel()}
          className="border-1 border-gray-300 px-3 py-1 text-15 rounded-[4px] font-[400] text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AssignMembersToTask;
