import React, { useState } from "react";
import Details from "../components/Details";
import ChatRoom from "../components/Invitations";

const TaskDetail = () => {
  return (
    <div className="px-10 flex justify-between">
      <Details />
      <ChatRoom />
    </div>
  );
};

export default TaskDetail;
