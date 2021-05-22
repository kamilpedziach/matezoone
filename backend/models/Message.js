const { model, Schema } = require("mongoose");

const Message = new Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Message", Message);
