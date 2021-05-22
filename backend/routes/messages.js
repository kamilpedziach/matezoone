const router = require("express").Router();
const Message = require("../models/Message");
const Conversations = require("../models/Conversations");

//add
router.post("/new", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const saved = await newMessage.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get last message

router.get("/last/:convId", async (req, res) => {
  const convId = req.params.convId;
  try {
    const messages = await Message.find({
      conversationId: convId,
    });
    res.status(200).json(messages[messages.length - 1]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
