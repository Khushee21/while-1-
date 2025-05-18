
import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema({
  members: {
    type: [String], // [from, to]
    required: true
  },
  messages: [
    {
      sender: String,
      content: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model("chatroom", ChatRoomSchema);
