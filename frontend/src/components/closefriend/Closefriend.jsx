import React from "react";
import { Avatar } from "@material-ui/core";
import "./closefriend.css";

const Closefriend = ({ user }) => {
  return (
    <>
      <li className="sidebarFriend">
        <Avatar
          alt="Remy Sharp"
          src={user.profilePicture}
          className="sidebarFriendImage"
        />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </>
  );
};

export default Closefriend;
