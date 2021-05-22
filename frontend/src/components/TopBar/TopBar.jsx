import React, { useContext, useEffect, useState, useRef } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext.js";
import { Link } from "react-router-dom";
import UsersList from "./UsersList";
import axios from "axios";
const App = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const popup = useRef();
  const popupWrapper = useRef();
  const searchUsers = useRef();
  useEffect(() => {
    try {
      const getUsers = async () => {
        const res = await axios.get("http://localhost:5000/api/users/users");
        setUsers(res.data);
        searchUsers.current = res.data;
      };
      getUsers();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const { user } = useContext(AuthContext);

  const handleOnClick = () => {
    popup.current.setAttribute("class", "popup");
    popupWrapper.current.setAttribute("class", "popupWrapper");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filterUsers = searchUsers.current.filter((user) =>
      user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsers(filterUsers);
  };

  const userList = users.map((user) => (
    <UsersList key={user._id} user={user} />
  ));

  const handleDisplayPopup = () => {
    popup.current.setAttribute("class", "exit");
    popupWrapper.current.setAttribute("class", "exit");
  };
  return (
    <>
      <div className="exit" ref={popup} onClick={handleDisplayPopup}></div>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" className="logoLink">
            <span className="logo">Matezoone</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="wyszukaj dowolną frazę..."
              className="searchInput"
              value={search}
              onClick={handleOnClick}
              onChange={handleSearch}
            />
            <ul
              className="exit"
              ref={popupWrapper}
              onClick={handleDisplayPopup}
            >
              {userList}
            </ul>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">{/* you can add notifications */}</div>
          <div className="topbarRightAvatarAndText">
            <Link to={`/profile/${user._id}`}>
              <img
                className="topbarRightImage"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "http://localhost:3000/assets/person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <Link to={`/profile/${user._id}`} className="profileImageLinkText">
              <span className="topbarRightName">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
