import React, { useContext } from "react";
import { Context } from "../context/Context";
import { MdStars } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TeamTable = ({ members, team, leader, setRemoved }) => {
  const { user, darkMode, leaveTeam } = useContext(Context);
  const navigate = useNavigate();
  const leaveTeamFunction = async (pk, leader_id, member_id, remove) => {
    try {
      const response = await leaveTeam(pk, leader_id, member_id, remove);
      setRemoved(member_id);
      if (remove == false) {
        navigate("/dashboard/");
      }
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
      className={`3xl:p-5 sm:p-2 mt-5 rounded-lg 3xl:w-70%  ${
        darkMode == "dark" ? "bg-myblack2" : "bg-white"
      } `}
    >
      {!members ? (
        <p>{team}</p>
      ) : (
        <div className="overflow-x-auto w-100%">
          <h1 className="3xl:text-2xl sm:text-18 font-semibold pb-5">Members</h1>
          <div
            className={`flex border-b-2 3xl:pb-3 sm:pb-1 ${
              darkMode == "dark" ? "border-black" : "border-mygrey"
            }`}
          >
            <h1 className="w-[45%] 3xl:text-17 sm:text-11 font-semibold">Name</h1>
            <h1 className="3xl:text-17 sm:text-11 font-semibold w-[35%]">Email</h1>
            <h1 className="3xl:text-17 sm:text-11 font-semibold w-10%">Role</h1>
            <h1 className="3xl:text-17 sm:text-11 font-semibold w-10% flex justify-end">Action</h1>
          </div>

          {leader ? (
            <div
              className={`flex  items-center 3xl:py-2 sm:py-1 border-b-2  ${
                darkMode == "dark" ? "border-black" : "border-mygrey"
              } `}
            >
              <div className="flex 3xl:gap-x-1 w-[45%]   items-center">
                {leader.profile.avatar ? (
                  <img
                    src={`http://127.0.0.1:8000/${leader.profile.avatar}`}
                    className={`3xl:w-14 3xl:h-14 md:w-44 md:h-44 sm:w-9 sm:h-9 rounded-full 3xl:ml-3 border-3 ${
                      darkMode == "dark" ? "border-myblack" : "border-white"
                    }`}
                  />
                ) : (
                  <FaUserCircle
                    className={`3xl:w-14 3xl:h-14 md:w-44 md:h-44 sm:w-9 sm:h-9 rounded-full 3xl:ml-3 border-3 ${
                      darkMode == "dark" ? "border-myblack" : "border-white"
                    }`}
                  />
                )}
                <div className="flex items-center ">
                  <h1 className="3xl:text-15 sm:text-11 font-semibold">
                    {getFullName(leader.first_name, leader.last_name)}
                  </h1>
                </div>
                {user ? (
                  user.username == leader.username ? (
                    <MdStars className="3xl:w-5 3xl:h-5 sm:w-3 sm:h-3 text-blue-600" />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
              <h1 className="3xl:text-15 w-[35%] sm:text-11">{leader.email}</h1>

              <h1 className="w-10% font-semibold 3xl:text-15 sm:text-11 ">Leader</h1>
            </div>
          ) : (
            ""
          )}

          {members
            ? members.map((member) => (
                <div key={member.id}>
                  {member.username == leader.username ? (
                    ""
                  ) : (
                    <div
                      className={`flex  items-center 3xl:py-2 sm:py-1 border-b-2  ${
                        darkMode == "dark" ? "border-black" : "border-mygrey"
                      }`}
                    >
                      <div className="flex 3xl:gap-x-1 w-[45%]  items-center">
                        {member.profile.avatar ? (
                          <img
                            src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                            className={`3xl:w-14 3xl:h-14 md:w-44 md:h-44 sm:w-9 sm:h-9 rounded-full 3xl:ml-3 border-3 ${
                              darkMode == "dark" ? "border-myblack" : "border-white"
                            }`}
                          />
                        ) : (
                          <FaUserCircle
                            className={`3xl:w-14 3xl:h-14 md:w-44 md:h-44 sm:w-9 sm:h-9 rounded-full 3xl:ml-3 border-3 ${
                              darkMode == "dark" ? "border-myblack" : "border-white"
                            }`}
                          />
                        )}
                        <div className="flex items-center">
                          <h1 className="3xl:text-15 sm:text-11 font-semibold whitespace-nowrap">
                            {getFullName(member.first_name, member.last_name)}
                          </h1>
                        </div>
                        {user && user.username == member.username ? (
                          <MdStars className="3xl:w-5 3xl:h-5 sm:w-3 sm:h-3 text-blue-600" />
                        ) : (
                          ""
                        )}
                      </div>
                      <h1 className="w-[35%] 3xl:text-15 sm:text-11">{member.email}</h1>

                      <h1 className="w-10% font-semibold 3xl:text-15 sm:text-11 ">Member</h1>

                      {user.username == leader.username ? (
                        <div className="w-10% flex justify-end">
                          <AiOutlineDelete
                            onClick={() => leaveTeamFunction(team.id, leader.id, member.id, true)}
                            className={`3xl:w-6 3xl:h-6 sm:w-[14px] sm:h-[14px] ${
                              darkMode == "dark" ? "text-white" : ""
                            }`}
                          />
                        </div>
                      ) : user.username == member.username ? (
                        <div className="w-10% flex justify-end">
                          <AiOutlineDelete
                            onClick={() => leaveTeamFunction(team.id, leader.id, member.id, false)}
                            className={`w-6 h-6 ${darkMode == "dark" ? "text-white" : ""}`}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              ))
            : ""}
        </div>
      )}
    </div>
  );
};

export default TeamTable;
