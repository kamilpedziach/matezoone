import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar.jsx";
import TopBar from "../../components/TopBar/TopBar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightBar/Rightbar.jsx";
import "./home.css";
import io from "socket.io-client";
import { AuthContext } from "../../context/AuthContext.js";
const Home = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("http://localhost:5000");
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {
      setUsers(users);
    });
  }, [user]);

  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar users={users} />
      </div>
    </>
  );
};

export default Home;
