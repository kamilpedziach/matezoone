const router = require("express").Router();
const Conversations = require("../models/Conversations");

//new conv
router.post("/", async (req, res) => {
  const newConversations = new Conversations({
    members: [req.body.userId, req.body.friendId],
  });
  try {
    const saved = await newConversations.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get conv of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversations.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/conv/:conversationId", async (req, res) => {
  try {
    const conversation = await Conversations.findById(
      req.params.conversationId
    );
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
