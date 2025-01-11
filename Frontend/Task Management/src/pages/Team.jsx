import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import TeamTable from "../components/TeamTable";

const Team = ({ ws }) => {
  const { getTeamMembers, user, sendInvite, darkMode, leaveTeam } = useContext(Context);
  const [members, setMembers] = useState();
  const [leader, setLeader] = useState();
  const [team, setTeam] = useState([]);
  const [email, setEmail] = useState();
  const [removed, setRemoved] = useState();

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

  return (
    <div
      className={`w-100% 3xl:-mt-5 sm:-mt-10 px-3 ${
        darkMode == "dark" ? "text-anti-flash-white" : ""
      }`}
    >
      <div className="flex 3xl:flex-row sm:flex-col justify-between ">
        <div>
          <h1 className="3xl:text-3xl sm:text-16 font-semibold">Members Management</h1>
          <h1 className="3xl:text-15 sm:text-11 text-gray-500">
            Manage your team members or invite new members to your workspace
          </h1>
        </div>
        <div className="">
          <h1 className="3xl:text-2xl sm:text-15 sm:pt-3 3xl:pt-0 font-semibold">
            Invite new member
          </h1>
          <h1 className="3xl:text-15 sm:text-11 text-gray-500">invite team member via email</h1>
          <div className="flex pt-5">
            <input
              className={`border-1 ${
                darkMode == "dark"
                  ? "border-myblack bg-myblack2"
                  : "border-mygrey2 bg-anti-flash-white"
              } rounded-l-md p-2 outline-none focus:border-2 w-72 3xl:h-10 sm:h-7 sm:w-fit  focus:border-blue-600 placeholder:sm:text-11`}
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={onSubmit}
              className="bg-blue-600 text-white 3xl:px-5 sm:px-3 3xl:text-16 sm:text-12   font-semibold rounded-r-md outline-none"
            >
              Send Invite
            </button>
          </div>
        </div>
      </div>
      <TeamTable
        members={members}
        team={team}
        leader={leader}
        user={user}
        setRemoved={setRemoved}
      />
    </div>
  );
};

export default Team;
