const mongoose = require("mongoose");
const messageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      trim: trusted,
    },
    Chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamp: true }
);

const Message = new mongoose.Model("Message", messageModel);

module.exports = Message;
