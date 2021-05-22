import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const ChattingPerson = ({ conv, userProf }) => {
  const { user } = useContext(AuthContext);
  const [usera, setUsera] = useState({});
  console.log(userProf);
  useEffect(() => {
    const getUser = async () => {
      if (conv.members) {
        const person = conv.members.filter((member) => member !== user._id);
        try {
          const res = await axios.get(
            `http://localhost:5000/api/users/?userId=${person}`
          );
          setUsera(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getUser();
  }, [conv, user._id]);
  const userMain = userProf ? userProf : usera;
  return (
    <div className="ImageAndTextchatBoxTop">
      <img
        src={
          userMain.profilePicture
            ? userMain.profilePicture
            : "http://localhost:3000/assets/person/noAvatar.png"
        }
        alt=""
        className="chatBoxTopImage"
      />
      <div className="greenDotActiveTop"></div>
      <div className="spansBoxTop">
        <span className="textChatBoxTop">{userMain.username}</span>
        <span className="textChatBoxOnlineTop">online now</span>
      </div>
    </div>
  );
};

export default ChattingPerson;
