import React from "react";
import "./online.css";
const Online = ({ user }) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={
            user.profilePicture
              ? user.profilePicture
              : "http://localhost:3000/assets/person/noAvatar.png"
          }
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Online;
