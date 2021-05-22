import React, { useEffect, useState, useContext } from "react";
import "./sidebar.css";
import { Button } from "@material-ui/core";
import axios from "axios";
import Closefriend from "../closefriend/Closefriend";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/profile/${user._id}/followers`
        );
        setFriends(res.data);
      } catch (err) {
        console.log("nie załadowano rightbara dostępnego tylko w profilu");
      }
    };
    handleData();
  }, [user._id]);

  const closeFriends = friends.map((user) => (
    <Closefriend key={user._id} user={user} />
  ));
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <Button variant="outlined" color="primary" className="sidebarButton">
          Show more
        </Button>
        <hr className="sidebarHR" />
        {/* lista przyjaciół */}
        <ul className="sidebarFriendList">
          <h4 className="rightbarTitle">Your friends</h4>
          {closeFriends}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
