import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import { MdStars, MdEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const { getTeamMembers, user, sendInvite, darkMode, leaveTeam } = useContext(Context);
  const [members, setMembers] = useState();
  const [leader, setLeader] = useState();
  const [team, setTeam] = useState([]);
  const [email, setEmail] = useState();
  const [removed, setRemoved] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        let response = await getTeamMembers();
        setTeam(response);
        setMembers(response.members);
        setLeader(response.leader);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeamMembers();
  }, [removed]);

  const onSubmit = async () => {
    try {
      const response = await sendInvite(email);
      alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveTeamFunction = async (pk, leader_id, member_id, remove) => {
    try {
      const response = await leaveTeam(pk, leader_id, member_id, remove);
      setRemoved(member_id);
      if (remove == false) {
        navigate("/dashboard/");
        window.location.reload();
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
      className={`w-100% sm:pl-10 sm:pr-3 lg:px-10 ${
        darkMode == "dark" ? "text-anti-flash-white" : ""
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Members Management</h1>
          <h1 className="text-15 text-gray-500">
            Manage your team members or invite new members to your workspace
          </h1>
        </div>
        <div className="">
          <h1 className="text-2xl font-semibold">Invite new member</h1>
          <h1 className="text-15 text-gray-500">invite team member via email</h1>
          <div className="flex pt-5">
            <input
              className={`border-1 ${
                darkMode == "dark"
                  ? "border-myblack bg-myblack2"
                  : "border-mygrey2 bg-anti-flash-white"
              } rounded-l-md p-2 outline-none focus:border-2 w-72 h-10  focus:border-blue-600`}
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={onSubmit}
              className="bg-blue-600 text-white px-5 font-semibold rounded-r-md outline-none"
            >
              Send Invite
            </button>
          </div>
        </div>
      </div>
      <div
        className={`lg:p-5 sm:p-2 mt-5 rounded-lg w-70%  ${
          darkMode == "dark" ? "bg-myblack2" : "bg-white"
        } `}
      >
        {!members ? (
          <p>{team}</p>
        ) : (
          <div>
            <h1 className="lg:text-2xl sm:text-18 font-semibold pb-5">Members</h1>
            <div
              className={`flex border-b-2 pb-3 ${
                darkMode == "dark" ? "border-black" : "border-mygrey"
              }`}
            >
              <h1 className="lg:w-40% sm:w-40% lg:text-17 sm:text-15 font-semibold">Name</h1>
              <h1 className="lg:text-17 sm:text-15 font-semibold w-40%">Email</h1>
              <h1 className="lg:text-17 sm:text-15 font-semibold w-10%">Role</h1>
              <h1 className="lg:text-17 sm:text-15 font-semibold w-10% flex justify-end">Action</h1>
            </div>

            {leader ? (
              <div
                className={`flex  items-center py-2 border-b-2  ${
                  darkMode == "dark" ? "border-black" : "border-mygrey"
                } `}
              >
                <div className="flex gap-x-1 lg:w-40%  items-center">
                  {leader.profile.avatar ? (
                    <img
                      src={`http://127.0.0.1:8000/${leader.profile.avatar}`}
                      className={`lg:w-14 lg:h-14 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                        darkMode == "dark" ? "border-myblack" : "border-white"
                      }`}
                    />
                  ) : (
                    <FaUserCircle
                      className={`lg:w-14 lg:h-14 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                        darkMode == "dark" ? "border-myblack" : "border-white"
                      }`}
                    />
                  )}
                  <div className="flex items-center ">
                    <h1 className="lg:text-15 sm:text-11 font-semibold">
                      {getFullName(leader.first_name, leader.last_name)}
                    </h1>
                  </div>
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
                <h1 className="text-15 w-40% ">{leader.email}</h1>

                <h1 className="w-10% font-semibold lg:text-15 sm:text-11 ">Leader</h1>
              </div>
            ) : (
              ""
            )}

            {members
              ? members.map((member) =>
                  member.username == leader.username ? (
                    ""
                  ) : (
                    <div
                      className={`flex  items-center py-2 border-b-2  ${
                        darkMode == "dark" ? "border-black" : "border-mygrey"
                      }`}
                    >
                      <div className="flex gap-x-1 lg:w-40%  items-center">
                        {member.profile.avatar ? (
                          <img
                            src={`http://127.0.0.1:8000/${member.profile.avatar}`}
                            className={`lg:w-14 lg:h-14 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                              darkMode == "dark" ? "border-myblack" : "border-white"
                            }`}
                          />
                        ) : (
                          <FaUserCircle
                            className={`lg:w-14 lg:h-14 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3 border-3 ${
                              darkMode == "dark" ? "border-myblack" : "border-white"
                            }`}
                          />
                        )}
                        <div className="flex items-center">
                          <h1 className="lg:text-15 sm:text-11 font-semibold">
                            {getFullName(member.first_name, member.last_name)}
                          </h1>
                        </div>
                        {user && user.username == member.username ? (
                          <MdStars className="w-5 h-5 text-blue-600" />
                        ) : (
                          ""
                        )}
                      </div>
                      <h1 className="w-40% text-15">{member.email}</h1>

                      <h1 className="w-10% font-semibold lg:text-15 sm:text-11 ">Member</h1>

                      {user.username == leader.username ? (
                        <div className="w-10% flex justify-end">
                          <AiOutlineDelete
                            onClick={() => leaveTeamFunction(team.id, leader.id, member.id, true)}
                            className={`w-6 h-6 ${darkMode == "dark" ? "text-white" : ""}`}
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
