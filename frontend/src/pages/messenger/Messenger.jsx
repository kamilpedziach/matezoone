import React, { useContext, useEffect, useState, useRef } from "react";
import "./messenger.css";
import "./chatinput.css";
import TopBar from "../../components/TopBar/TopBar";
import ChattingPerson from "../../components/chattingPerson/ChattingPerson.jsx";
import Conversations from "../../components/conversations/Conversations";
import MyMessage from "../../components/message/MyMessage.jsx";
import FriendMessage from "../../components/friendMessage/FriendMessage.jsx";
import io from "socket.io-client";
import {
  AttachFile,
  NotInterested,
  EmojiEmotions,
  Mic,
} from "@material-ui/icons";
import axios from "axios";

import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import {
  Search,
  FiberManualRecord,
  PhoneForwarded,
  Videocam,
  MoreVert,
} from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";
const Messenger = (props) => {
  const [conversation, setCoversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chattingPerson, setChattingPerson] = useState({});
  const scrollRef = useRef();
  const socket = useRef();
  const { user } = useContext(AuthContext);
  let chat = useRef("");
  const location = useLocation();
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);
  useEffect(() => {
    socket.current.on("getMessages", (messages) => {
      console.log(messages);
      setMessages(messages);
    });
  }, []);

  const ConvList = conversation.map((conv) => (
    <Link
      to={`/messenger/${conv._id}`}
      style={{ textDecoration: "none", color: "black" }}
      key={conv._id}
    >
      <div
        onClick={() => {
          socket.current.emit("joinRoom", conv._id);
          setCurrentChat(conv._id);
        }}
        key={conv._id}
      >
        <Conversations
          key={conv._id}
          conv={conv}
          userMain={user}
          messages={messages}
        />
      </div>
    </Link>
  ));

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${currentChat}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getConv = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/conversations/${user._id}`
        );
        setCoversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConv();
  }, [user]);

  useEffect(() => {
    if (currentChat) {
      const getSingleConv = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/conversations/conv/${currentChat}`
          );
          setChattingPerson(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getSingleConv();
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  const handleInputChange = async (e) => {
    e.preventDefault();
    const newMessage = {
      conversationId: currentChat,
      senderId: user._id,
      text: chat.current.value,
    };
    try {
      await axios.post(`http://localhost:5000/api/messages/new`, newMessage);
      socket.current.emit(
        "sendMessage",
        messages,
        currentChat,
        user._id,
        chat.current.value
      );
      chat.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="searchMenuWrapper">
              <Search className="searchMenuIcon" />
              <input
                placeholder="Search"
                className="menuChatSearchInput"
                type="text"
              />
              <Button
                className="buttonOnlineMessenger"
                variant="contained"
                color="secondary"
                startIcon={<FiberManualRecord />}
              >
                Online
              </Button>
            </div>
            <div className="newComingMessage"></div>
            {ConvList}
          </div>
        </div>
        <div className="chatBox">
          {currentChat ? (
            <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                <ChattingPerson
                  conv={chattingPerson}
                  userProf={location.state?.userProf}
                />

                <div className="ChattingIcons">
                  <IconButton className="PhoneIcon">
                    <PhoneForwarded />
                  </IconButton>
                  <IconButton className="VideocamIcon">
                    <Videocam />
                  </IconButton>
                  <IconButton className="moreVertIcon">
                    <MoreVert />
                  </IconButton>
                </div>
              </div>
              <div className="chatArea">
                {messages.map((message) => {
                  if (message.senderId === user._id) {
                    return (
                      <div ref={scrollRef}>
                        <MyMessage
                          message={message}
                          conversationId={
                            location.state?.convId
                              ? location.state?.convId
                              : currentChat
                          }
                          key={message._id}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <FriendMessage
                          message={message}
                          conversationId={
                            location.state?.convId
                              ? location.state?.convId
                              : currentChat
                          }
                          key={message._id}
                        />
                      </div>
                    );
                  }
                })}
              </div>
              <div className="chatBoxBottom">
                <form
                  className="ImageandTextChatBoxBottom"
                  onSubmit={handleInputChange}
                >
                  <IconButton title="Add Attachment">
                    <AttachFile />
                  </IconButton>
                  <input
                    type="text"
                    className="InputChatText"
                    placeholder="Type your message and send"
                    ref={chat}
                  />
                </form>
                <div className="ChatBoxBottomIcons">
                  <IconButton title="Block User">
                    <NotInterested />
                  </IconButton>
                  <IconButton title="Send voice message">
                    <Mic />
                  </IconButton>
                  <IconButton title="Choose the emoji">
                    <EmojiEmotions />
                  </IconButton>
                </div>
                <div className="ChatBoxBottomEmoji"></div>
              </div>
            </div>
          ) : (
            <div className="nochatclass">
              <span>Open new conversation to start chatting</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messenger;
