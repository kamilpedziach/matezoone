import React, { useEffect, useState, useContext } from "react";
import "./feed.css";
import Share from "../Share/Share.jsx";
import Post from "../post/Post.jsx";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = id
        ? await axios.get(`http://localhost:5000/api/posts/profile/${id}`)
        : await axios.get(
            `http://localhost:5000/api/posts/timeline/${user._id}`
          );
      console.log(res.data);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    getPosts();
  }, [id, user._id]);
  const timeline = posts.map((post) => <Post key={post._id} post={post} />);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!id || id === user._id) && <Share />}
        {timeline}
      </div>
    </div>
  );
};

export default Feed;
