import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversations.css";
const Conversations = ({ conv, userMain, messages }) => {
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const user = conv.members.filter((member) => member !== userMain._id);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/?userId=${user}`
        );
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conv, userMain]);

  return (
    <div className="conversation">
      <div className="ImageandTextMessengerBottom">
        <img
          className="conversationImg"
          src={
            currentUser.profilePicture
              ? currentUser.profilePicture
              : "http://localhost:3000/assets/person/noAvatar.png"
          }
          alt=""
        />
        <div className="greenDotActive"></div>
        <div className="comingMessageText">
          <span className="comingMessageTextUsername">
            {currentUser.username}
          </span>
        </div>
      </div>
      <div className="comingMessageNotificationBottom"></div>
    </div>
  );
};

export default Conversations;
