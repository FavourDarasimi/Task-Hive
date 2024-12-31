import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { RxCross1 } from "react-icons/rx";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoStar, IoStarOutline } from "react-icons/io5";

const Inbox = ({ setShowInbox }) => {
  const { darkMode, getFirstLetter, getUserNotification } = useContext(Context);
  const [status, setStatus] = useState("all");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const response = await getUserNotification();
        setNotifications(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserNotifications();
  }, [status]);
  return (
    <div className=" fixed z-50 inset-0  bg-black w-100%   bg-opacity-50 grid place-items-center">
      <div
        className={`w-50% max-h-60% ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } p-5 rounded-lg`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-blue-600">Inbox</h1>
          <RxCross1
            onClick={() => setShowInbox(false)}
            className={`w-5 h-5 cursor-pointer ${darkMode == "dark" ? "text-white" : ""}`}
          />
        </div>

        <div className="flex gap-x-7 text-gray-400 text-19 pt-5">
          <h1
            className={`pb-2 cursor-pointer ${
              status == "all" ? "border-b-2 border-blue-400 text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setStatus("all")}
          >
            All Messages
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
              status == "favourite" ? "border-b-2 border-blue-400 text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setStatus("favourite")}
          >
            Favourites
          </h1>
        </div>
        <div>
          {notifications ? (
            notifications.map((notification) => (
              <div className="flex gap-x-1">
                {notification.starred ? <IoStar fill="yellow" /> : <IoStarOutline />}

                <h1>{notification.message}</h1>
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
