import mongoose from "mongoose";
const ChatListSchema = new mongoose.Schema({
    userEmail: {
      type: String,
      required: true,
      unique: true
    },
    chatsWith: [String] 
  });
  
export default mongoose.model("chatlist", ChatListSchema);