import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./mymessage.css";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

const Message = ({ message, conversationId }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="mymessage">
      <img
        src={
          user.profilePicture
            ? user.profilePicture
            : "http://localhost:3000/assets/person/noAvatar.png"
        }
        alt=""
        className="chatDymekMainImage"
      />
      <span className="timeSendDymek">{format(message.createdAt)}</span>
      <div className="mymessageDymek">{message.text}</div>
    </div>
  );
};

export default Message;
