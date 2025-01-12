import React, { useContext } from "react";
import { Context } from "../context/Context";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const NotificationMenu = ({ notifications, setRead, setShowInbox }) => {
  const { darkMode, markAsRead, markAllAsRead } = useContext(Context);
  const handleReadClick = async (id) => {
    if (id) {
      try {
        const response = await markAsRead(id);
        setRead(id);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await markAllAsRead();
        setRead(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-18 font-semibold">My Notifications</h1>
        {notifications.length > 0 && (
          <div
            onClick={() => handleReadClick()}
            className="flex gap-x-1 text-blue-500  items-center"
          >
            <h1 className="text-12 font-bold cursor-pointer">Mark all as read</h1>
          </div>
        )}
      </div>

      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`py-4 ${
            darkMode == "dark" ? "border-b-black border-b-1" : "border-b-mygrey border-b-1"
          }`}
        >
          <div className="flex items-start gap-x-2">
            <div className="bg-blue-700 h-[10px] w-[10px] mt-1 rounded-full"></div>
            <h1 className="text-14 font-medium">{notification.message}</h1>
          </div>
          <div className="flex justify-between pl-4">
            <h1 className="text-gray-400 text-13">
              {new Date(notification.date_created).toLocaleDateString()}
            </h1>
            <div
              className="flex gap-x-1 text-blue-500 items-center cursor-pointer"
              onClick={() => handleReadClick(notification.id)}
            >
              <h1 className="text-12 font-medium">Mark as read</h1>
            </div>
          </div>
        </div>
      ))}
      <h1
        className="text-14 text-blue-700 font-semibold pt-5 cursor-pointer"
        onClick={() => setShowInbox(true)}
      >
        View Inbox
      </h1>
    </div>
  );
};

export default NotificationMenu;
