const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const cors = require("cors");
const path = require("path");
const conversationsRouter = require("./routes/conversations");
const messagesRouter = require("./routes/messages");

dotenv.config();
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("baza danych podpięta")
);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
//midlewares
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", conversationsRouter);
app.use("/api/messages", messagesRouter);

let users = [];

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("addUser", (user) => {
    if (!users.some((usera) => usera._id === user._id)) {
      const newUser = {
        ...user,
        socketId: socket.id,
      };
      users.push(newUser);
    }
    io.emit("getUsers", users);
  });
  socket.on("joinRoom", (conversationId) => {
    socket.join(conversationId);
  });
  socket.on("sendMessage", (messages, conversationId, senderId, text) => {
    const actualMessages = messages;
    actualMessages.push({ conversationId, senderId, text });
    io.to(conversationId).emit("getMessages", actualMessages);
  });
  socket.on("disconnect", () => {
    console.log("user left");
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(5000, () => console.log(`serwer działa na porcie 5001`));
