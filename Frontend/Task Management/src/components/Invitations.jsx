import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import cancel from "../assets/icons8-cross-24.png";
import { RxCross1 } from "react-icons/rx";

const Invitations = ({ setShowInvites, status, setStatus }) => {
  const { getUserInvites, darkMode, responseToInvite, getFirstLetter } = useContext(Context);
  const [invites, setInvites] = useState([]);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    const fetchUserInvites = async () => {
      try {
        const response = await getUserInvites();
        setInvites(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInvites();
  }, [status]);
  const handleClick = async (id, res, pk, workspace) => {
    console.log(workspace);
    try {
      const response = await responseToInvite(id, res, pk, workspace);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" fixed z-50 inset-0  bg-black w-100%   bg-opacity-50 grid place-items-center">
      {invites ? (
        <div
          className={`w-23% ${
            darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
          } p-5 rounded-lg`}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-blue-600">Invitations</h1>
            <RxCross1
              onClick={() => setShowInvites(false)}
              className={`w-4 h-4 cursor-pointer ${darkMode == "dark" ? "text-white" : ""}`}
            />
          </div>
          <div className="flex flex-col  pt-4">
            {invites.length > 0 ? (
              invites.map((invite) => (
                <div
                  className={`flex items-center justify-between ${
                    darkMode == "dark" ? "border-b-black border-b-1" : "border-b-mygrey border-b-1"
                  }`}
                >
                  <div className="flex gap-x-3 py-5 text-15">
                    <div className="w-3 h-3 mt-2 bg-blue-600 rounded-full"></div>
                    <div>
                      {invite.responded == true ? (
                        invite.status == "Accepted" ? (
                          <div>
                            You Accepted {invite.sender.username} invite to join his Team(Workspace)
                          </div>
                        ) : (
                          <div>
                            You Rejected {invite.sender.username} invite to join his Team(Workspace)
                          </div>
                        )
                      ) : (
                        <div>
                          <h1>{invite.sender.username} invites you to his Team (WorkSpace) </h1>
                          <div className="flex gap-x-2 ">
                            <button
                              className="bg-blue-600 text-white py-1 px-3 rounded-md text-13"
                              onClick={() => {
                                setStatus(!status);
                                handleClick(invite.sender.id, true, invite.id, invite.workspace);
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="border-1 border-mygrey2 py-1 px-3 rounded-md text-13"
                              onClick={() => {
                                setStatus(!status);
                                handleClick(
                                  invite.sender.id,
                                  false,
                                  invite.id,
                                  invite.workspace.id
                                );
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                      <h1 className="text-12 text-gray-400">{invite.time_since_created}</h1>
                    </div>
                  </div>
                  <div className="w-9 h-9 bg-purple-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {getFirstLetter(invite.sender.username)}
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center font-semibold text-19">No Invites Yet</h1>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Invitations;
