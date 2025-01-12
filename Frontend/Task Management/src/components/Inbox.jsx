import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { RxCross1 } from "react-icons/rx";
import { FaRegStar, FaStar, FaUserCircle } from "react-icons/fa";
import { IoStar, IoStarOutline } from "react-icons/io5";

const Inbox = ({ setShowInbox, setStatuss, statuss }) => {
  const {
    darkMode,
    getFirstLetter,
    getUserNotification,
    responseToInvite,
    getUserWorkspaces,
    markAllAsRead,
  } = useContext(Context);
  const [status, setStatus] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [workspaces, setWorkspace] = useState([]);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const response = await getUserNotification();
        setNotifications(response);
        const response2 = await getUserWorkspaces();
        setWorkspace(response2.active);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserNotifications();
  }, [status, statuss]);

  const handleReadClick = async () => {
    try {
      const response = await markAllAsRead();
      setStatus(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTimeWithoutSeconds = (datetime) => {
    const date = new Date(datetime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleClick = async (id, res, pk, workspace, notification_id) => {
    console.log(workspace);
    try {
      const response = await responseToInvite(
        id,
        res,
        pk,
        workspace,
        workspaces.id,
        notification_id
      );
      setStatuss(pk);
      if (res) {
        window.location.reload();
        navigate("/dashboard/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" fixed z-50 inset-0  bg-black w-100%   bg-opacity-50 grid place-items-center">
      <div
        className={`w-[26%] max-h-[70%] overflow-y-auto  ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        }  rounded-lg`}
      >
        <div className="flex justify-between items-center px-3 pt-3">
          <h1 className="text-[22px] font-semibold">Inbox</h1>
          <div className="flex justify-end">
            <RxCross1
              onClick={() => setShowInbox(false)}
              className={`w-5 h-5  cursor-pointer ${darkMode == "dark" ? "text-white" : ""}`}
            />
          </div>
        </div>
        <div className="flex justify-between items-center px-5 pt-2">
          <div className="flex gap-x-7 text-gray-400 text-15  border-b-2 border-gray-300  ">
            <h1
              className={`pb-2 cursor-pointer ${
                status == "all" ? "border-b-2 border-blue-400 text-blue-600 font-semibold" : ""
              }`}
              onClick={() => setStatus("all")}
            >
              All
            </h1>
            <h1
              className={`pb-2 cursor-pointer ${
                status == "unread" ? "border-b-2 border-blue-400 text-blue-600 font-semibold" : ""
              }`}
              onClick={() => setStatus("unread")}
            >
              Unread
            </h1>
            <h1
              className={`pb-2 cursor-pointer ${
                status == "favourite"
                  ? "border-b-2 border-blue-400 text-blue-600 font-semibold"
                  : ""
              }`}
              onClick={() => setStatus("favourite")}
            >
              Favourites
            </h1>
          </div>
          <h1
            className="text-blue-600 cursor-pointer font-semibold text-14"
            onClick={() => handleReadClick()}
          >
            Mark all as Read
          </h1>
        </div>

        <div>
          {notifications ? (
            notifications.map((notification) => (
              <div
                className={`flex gap-x-2 items-start border-b-1 border-gray-200 px-7 py-4 ${
                  notification.read ? "bg-white" : "bg-gray-100"
                }`}
                key={notification.id}
              >
                <div className="relative">
                  {notification.initiator.profile && notification.initiator.profile.avatar ? (
                    <div>
                      <img
                        src={`http://127.0.0.1:8000/${notification.initiator.profile.avatar}`}
                        className="w-12 h-12 rounded-full"
                      />
                      {notification.read ? (
                        ""
                      ) : (
                        <div className="bg-blue-700 h-[13px] w-[13px] absolute top-0 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <FaUserCircle className="w-14 h-14 " />
                      {notification.read ? (
                        ""
                      ) : (
                        <div className="bg-blue-700 h-[13px] w-[13px] absolute top-0 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-15">{notification.message}</h1>
                  {notification.is_today ? (
                    <h1 className="text-12 text-gray-500">
                      {formatTimeWithoutSeconds(notification.date_created)}
                    </h1>
                  ) : (
                    <h1 className="text-12 text-gray-500">
                      {new Date(notification.date_created).toLocaleDateString()}
                    </h1>
                  )}

                  {notification.invite ? (
                    <div>
                      {notification.invite.responded == true ? (
                        ""
                      ) : (
                        <div>
                          <div className="flex gap-x-2 ">
                            <button
                              className="bg-blue-600 text-white py-1 px-3 rounded-md text-13"
                              onClick={() => {
                                handleClick(
                                  notification.invite.sender.id,
                                  true,
                                  notification.invite.id,
                                  notification.invite.workspace,
                                  notification.id
                                );
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="border-1 border-mygrey2 py-1 px-3 rounded-md text-13"
                              onClick={() => {
                                handleClick(
                                  notification.invite.sender.id,
                                  false,
                                  notification.invite.id,
                                  notification.invite.workspace,
                                  notification.id
                                );
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))
          ) : (
            <h1>No Notifications</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
