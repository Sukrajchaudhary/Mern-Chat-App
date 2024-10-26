const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    unreadCount: {
      type: Number,
      default: 0, 
    },
  },
  { timestamps: true }
);

exports.Message = mongoose.model("Message", messageSchema);
