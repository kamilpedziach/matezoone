import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import { MoreVert, ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
const Post = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [PostUser, setPostUser] = useState({});
  const [likeCount, setlikeCount] = useState(post.likes.length);
  useEffect(() => {
    setLike(post.likes.includes(user._id));
  }, [post.likes, user._id]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users/?userId=${post.userId}`
      );
      setPostUser(res.data);
    };
    getUsers();
  }, [post.userId]);
  const handleOnClick = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/like/${post._id}`, {
        userId: user._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike((prev) => !prev);
    if (!like) {
      setlikeCount((prev) => prev + 1);
    } else {
      setlikeCount((prev) => prev - 1);
    }
    console.log(likeCount);
  };
  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImage"
                src={
                  PostUser.profilePicture === ""
                    ? "http://localhost:3000/assets/person/noAvatar.png"
                    : PostUser.profilePicture
                }
                alt=""
              />
              <span className="postUsername">{PostUser.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert className="moreVert" />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImage" src={post.img} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <Button
                className="postLike"
                variant="contained"
                color="secondary"
                startIcon={like ? <ThumbDownAlt /> : <ThumbUpAlt />}
                onClick={handleOnClick}
              >
                {like ? "Unlike" : "Like"}
              </Button>
              <span className="postLikeCounter">
                {likeCount === 0
                  ? `no likes yet`
                  : `${likeCount} people like it`}
              </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comment} comments</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
