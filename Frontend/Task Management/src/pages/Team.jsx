import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import { MdStars, MdEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";

import { HiOutlineDotsVertical } from "react-icons/hi";

const Team = () => {
  const { getTeamMembers, user, sendInvite, darkMode } = useContext(Context);
  const [members, setMembers] = useState();
  const [leader, setLeader] = useState();
  const [team, setTeam] = useState();
  const [email, setEmail] = useState();
  const [showMenu, setShowMenu] = useState();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await getTeamMembers();
        console.log(user);
        if (response.team == true) {
          setMembers(response.user);
          setLeader(response.user.leader);
        } else if (response.team == false) {
          setTeam(response.user);
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeamMembers();
  }, []);

  const onSubmit = async () => {
    try {
      const response = await sendInvite(email);
      alert(response.success);
    } catch (error) {
      console.log(error);
    }
  };

  const getFullName = (first_name, last_name) => {
    const fullName = first_name + " " + last_name;
    return fullName;
  };
  return (
    <div
      className={`sm:pl-10 sm:pr-3 lg:px-10 ${darkMode == "dark" ? "text-anti-flash-white" : ""}`}
    >
      <div className="flex justify-end">
        <div className="flex">
          <input
            className={`border-1 ${
              darkMode == "dark"
                ? "border-myblack bg-myblack2"
                : "border-mygrey2 bg-anti-flash-white"
            } rounded-l-md p-2 outline-none focus:border-2 w-72 h-12  focus:border-blue-600`}
            type="email"
            placeholder="Invite by Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-7 font-semibold rounded-r-md outline-none"
          >
            Invite
          </button>
        </div>
      </div>
      <div
        className={`${
          darkMode == "dark" ? "bg-myblack2" : "bg-white"
        } lg:p-5 sm:p-2 mt-5 rounded-lg`}
      >
        {team ? (
          <p>{team}</p>
        ) : (
          <div>
            <h1 className="lg:text-2xl sm:text-18 text-center font-semibold pb-5">Team Members</h1>
            <div
              className={`flex border-b-2 pb-3 ${
                darkMode == "dark" ? "border-black" : "border-mygrey"
              }`}
            >
              <h1 className="lg:w-30% sm:w-40% lg:text-18 sm:text-15 font-semibold">Name</h1>
              <h1 className="lg:text-18 sm:text-15 font-semibold w-30%">Email</h1>
              <h1 className="lg:text-18 sm:text-15 font-semibold w-20%">Role</h1>
            </div>

            {leader ? (
              <div
                className={`flex  items-center py-4 border-b-2  ${
                  darkMode == "dark" ? "border-black" : "border-mygrey"
                } `}
              >
                <div className="flex gap-x-1 lg:w-30%  items-center">
                  <div
                    className={` bg-red-500 rounded-full lg:h-9 lg:w-9 sm:w-7 sm:h-7 lg:text-16 sm:text-11 text-white text-15 font-bold flex items-center justify-center border-2 ${
                      darkMode == "dark" ? "border-black" : "border-white"
                    }`}
                  >
                    D
                  </div>
                  <h1 className="lg:text-16 sm:text-11">
                    {getFullName(leader.first_name, leader.last_name)}
                  </h1>
                  {user ? (
                    user.username == leader.username ? (
                      <MdStars className="w-5 h-5 text-blue-600" />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
                <h1 className="lg:w-30%  lg:text-16 sm:text-11">{members.leader.email}</h1>
                <h1 className="w-20% font-semibold lg:text-16 sm:text-11 ">Leader</h1>

                <div className="w-20% flex justify-end">
                  <RxCross1 className="text-red-600" />
                </div>
              </div>
            ) : (
              ""
            )}

            {members
              ? members.members.map((member) =>
                  member.username == leader.username ? (
                    ""
                  ) : (
                    <div
                      className={`flex  items-center py-4 border-b-2  ${
                        darkMode == "dark" ? "border-black" : "border-mygrey"
                      }`}
                    >
                      <div className="flex gap-x-1 lg:w-30%  items-center">
                        <div
                          className={` bg-red-500 rounded-full lg:h-9 lg:w-9 sm:w-7 sm:h-7 lg:text-16 sm:text-11 text-white text-15 font-bold flex items-center justify-center border-2 ${
                            darkMode == "dark" ? "border-black" : "border-white"
                          }`}
                        >
                          D
                        </div>
                        <h1 className="lg:text-16 sm:text-11">
                          {getFullName(member.first_name, member.last_name)}
                        </h1>
                        {user.username == member.username ? (
                          <MdStars className="w-5 h-5 text-blue-600" />
                        ) : (
                          ""
                        )}
                      </div>
                      <h1 className="lg:w-30%  lg:text-16 sm:text-11">{member.email}</h1>
                      <h1 className="w-20% font-semibold lg:text-16 sm:text-11 ">Member</h1>

                      <div className="w-20% flex justify-end">
                        <button
                          onClick={() =>
                            showMenu == member.id ? setShowMenu() : setShowMenu(member.id)
                          }
                        >
                          <HiOutlineDotsVertical className="w-5 h-5" />
                        </button>

                        <div
                          className={` bg-white shadow-2xl py-2 absolute rounded-lg flex flex-col gap-y-3 font-semibold mt-7 ${
                            showMenu == member.id ? "block" : "hidden"
                          }`}
                        >
                          <div className="flex gap-x-1 items-center pl-2 py-1 pr-8 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white">
                            <MdEdit />
                            <h1 className="">Make Admin</h1>
                          </div>
                          <div className="flex gap-x-1 items-center text-red-600 pl-2 py-1 pr-8 cursor-pointer hover:bg-blue-600 hover:rounded-lg  hover:text-white">
                            <RxCross1 className="" />
                            <h1 className="">Remove</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )
              : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
