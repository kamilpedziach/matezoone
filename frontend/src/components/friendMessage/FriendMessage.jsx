import React, { useEffect, useState } from "react";
import "./friendmessage.css";
import axios from "axios";
import { format } from "timeago.js";
const FriendMessage = ({ message }) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const user = message.senderId;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/?userId=${user}`
        );
        setCurrentUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message.senderId]);
  return (
    <div className="friendmessage">
      <div className="flexTimeSendandImg">
        <span className="timeSendDymek">{format(message.createdAt)}</span>
        <img
          src={
            currentUser.profilePicture
              ? currentUser.profilePicture
              : "http://localhost:3000/assets/person/noAvatar.png"
          }
          alt=""
          className="friendchatDymekImage"
        />
      </div>
      <div className="friendmessageDymek">{message.text}</div>
      <div className="spanAndImageDymekFriend"></div>
    </div>
  );
};

export default FriendMessage;
