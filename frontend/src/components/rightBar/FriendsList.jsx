import React from "react";
import "./rightBar.css";
import { Link } from "react-router-dom";
const friendsList = ({ user }) => {
  return (
    <Link
      to={`/profile/${user._id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="rightbarFollowing">
        <img
          src={
            user.profilePicture
              ? user.profilePicture
              : `http://localhost:3000/assets/person/noAvatar.png`
          }
          alt=""
          className="rightbarFollowingImg"
        />
        <span className="rightbarUsernameFollowing">{user.username}</span>
      </div>
    </Link>
  );
};

export default friendsList;
