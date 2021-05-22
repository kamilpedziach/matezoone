import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const ConvTop = ({ conv }) => {
  const { user } = useContext(AuthContext);
  const [usera, setUsera] = useState({});
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
  return (
    <div className="comingMessageText">
      <span className="comingMessageTextUsername">John Done</span>
      <span className="comingMessageDesc">i want to....</span>
    </div>
  );
};

export default ConvTop;
