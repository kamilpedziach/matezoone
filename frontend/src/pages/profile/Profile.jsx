import React, { useState, useEffect, useContext } from "react";
import "./profile.css";
import TopBar from "../../components/TopBar/TopBar.jsx";
import Sidebar from "../../components/SideBar/Sidebar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightBar/Rightbar.jsx";
import { useHistory } from "react-router-dom";
import {
  PersonAdd,
  Message,
  RemoveCircleOutline,
  ExitToApp,
} from "@material-ui/icons";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
const Profile = () => {
  let history = useHistory();
  const { user: CurrentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [conversations, setConversations] = useState([]);
  const { id } = useParams();
  const [isFollow, setisFollow] = useState(CurrentUser.followings.includes(id));

  useEffect(() => {
    const getConv = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/conversations/${CurrentUser._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConv();
  }, [CurrentUser._id]);

  const handleOnClick = async () => {
    try {
      if (!isFollow) {
        await axios.put(`http://localhost:5000/api/users/${id}/follow`, {
          userId: CurrentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: CurrentUser._id });
      } else {
        await axios.put(`http://localhost:5000/api/users/${id}/unfollow`, {
          userId: CurrentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: CurrentUser._id });
      }
    } catch (err) {
      console.log(err);
    }
    setisFollow(!isFollow);
  };
  const handleNewConv = async () => {
    const friendId = id;
    const isExisting = conversations.some(
      (conv) =>
        conv.members.includes(friendId) &&
        conv.members.includes(CurrentUser._id)
    );
    console.log(isExisting);
    if (!isExisting) {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/conversations`,
          {
            userId: CurrentUser._id,
            friendId,
          }
        );
        const id = res.data._id;
        history.push({
          pathname: `/messenger/${id}`,
          state: { convId: id, userProf: user },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      const conv = conversations.find(
        (conv) =>
          conv.members.includes(friendId) &&
          conv.members.includes(CurrentUser._id)
      );
      history.push({
        pathname: `/messenger/${conv._id}`,
        state: { convId: conv._id, userProf: user },
      });
    }
  };
  const handleLogout = () => {
    history.push("/login");
    dispatch({ type: "LOGOUT" });
  };
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users?userId=${id}`
      );
      console.log(res.data);
      setUser(res.data);
    };
    getUser();
  }, [id]);

  return (
    <>
      <TopBar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImage"
                src={
                  user.coverPicture === ""
                    ? "http://localhost:3000/assets/person/noCover.jpg"
                    : user.coverPicture
                }
                alt=""
              />
              <img
                className="profileUserImage"
                src={
                  user.profilePicture === ""
                    ? "http://localhost:3000/assets/person/noAvatar.png"
                    : user.profilePicture
                }
                alt=""
              />
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>

            {CurrentUser._id === id ? (
              <Button
                className="logout"
                variant="contained"
                color="secondary"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  className="follow"
                  variant="contained"
                  color="secondary"
                  startIcon={isFollow ? <RemoveCircleOutline /> : <PersonAdd />}
                  onClick={handleOnClick}
                >
                  {isFollow ? "unFollow" : "Follow"}
                </Button>
                <Button
                  className="follow"
                  variant="contained"
                  color="secondary"
                  startIcon={<Message />}
                  onClick={handleNewConv}
                >
                  Send message
                </Button>
              </>
            )}
          </div>
          <div className="profileRightBottom">
            <Feed id={id} />
            <Rightbar currentUser={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
