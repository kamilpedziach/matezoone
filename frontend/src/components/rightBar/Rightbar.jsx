import React, { useContext, useEffect, useRef, useState } from "react";
import "./rightBar.css";
import FriendsList from "./FriendsList";
import Online from "../online/Online";
import axios from "axios";
import { Users } from "../../dummyData";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Rightbar = ({ currentUser, users }) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [followingUsers, setFollowingUsers] = useState([]);
  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/profile/${id}/followers`
        );
        setFollowingUsers(res.data);
      } catch (err) {
        console.log("nie załadowano rightbara dostępnego tylko w profilu");
      }
    };
    if (id) {
      handleData();
    }
  }, [id]);
  const onlineUsers = users?.map((currentUser) => (
    <Online key={currentUser._id} user={currentUser} />
  ));
  const friendsList = followingUsers.map((currentUser) => (
    <FriendsList key={currentUser._id} user={currentUser} />
  ));

  const HomePage = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImage"
            src="http://localhost:3000/assets/gift.png"
            alt=""
          />
          <span className="birthdayText">No birthdays today!</span>
        </div>
        <img
          className="rightbarAd"
          src="http://localhost:3000/assets/buyskins.jpg"
          alt=""
        />
        <h4 className="rightbarTitle">Online Users</h4>
        <ul className="rightbarFriendList">{onlineUsers}</ul>
      </>
    );
  };
  const ProfilePage = () => {
    return (
      <>
        {id === user._id ? null : <div id="rightBarFlex"></div>}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{currentUser.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{currentUser.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {currentUser.relationship === 1 ? "Wolny/a" : "W związku"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">{friendsList}</div>
      </>
    );
  };

  return (
    <div className="rightBar">
      <div className="rightbarWrapper">
        {currentUser ? <ProfilePage /> : <HomePage />}
      </div>
    </div>
  );
};

export default Rightbar;
