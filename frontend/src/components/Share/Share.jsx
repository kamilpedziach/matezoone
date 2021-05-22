import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Share() {
  const shareInput = useRef("");
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState();
  const handleOnChange = (e) => setFile(e.target.files[0]);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: shareInput.current.value,
    };
    if (file) {
      const data = new FormData();
      const Datanow = Date.now();
      const fileName = `${Datanow}${file.name}`;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = `http://localhost:5000/images/${Datanow}${file.name}`;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("http://localhost:5000/api/posts", newPost);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : "http://localhost:3000/assets/person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={`What's upp ${user.username}`}
            className="shareInput"
            ref={shareInput}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancel" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleOnSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleOnChange}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
