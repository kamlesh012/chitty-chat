const mongoose = require("mongoose");
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Message,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User, //commented in tutorisal
    },
  },
  { timestamps: true }
);

const Chat = new mongoose.Model(Chat, chatModel);

//object can be created like this const first = new chat({});

module.exports = Chat;
