import React from "react";
import { Link } from "react-router-dom";
const UsersList = ({ user }) => {
  return (
    <Link to={`/profile/${user._id}`} className="linkSearchTopBar">
      <li className="liTopBarSearch">
        <img
          src={
            user.profilePicture
              ? user.profilePicture
              : "http://localhost:3000/assets/person/noAvatar.png"
          }
          alt=""
          className="imgSearchTopBar"
        />
        <div className="divSearchTopBar">
          <span className="spanSearchTopBar">{user.username}</span>
          <span className="citySpanSearchTopBar">{user.city}</span>
        </div>
      </li>
    </Link>
  );
};

export default UsersList;
