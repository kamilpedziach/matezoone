const { model, Schema } = require("mongoose");

const Conversations = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = model("Conversations", Conversations);
