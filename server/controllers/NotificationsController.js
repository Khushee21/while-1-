import Notification from "../models/Notifications.js";
import ChatList from "../models/ChatList.js";
import User from "../models/userModel.js";
import ChatRoom from "../models/ChatRoom.js";
import jwt from 'jsonwebtoken';


export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


// Get all notifications for a user
export const getNotification = async (req, res) => {
  try {
    const useremail = req.params.email;
    const notifications = await Notification.find({ to: useremail }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Data is not fetched successfully" });
  }
};


export const postNotification = async (req, res) => {
  const { to, from } = req.body;

  if (!to || !from) {
    return res.status(400).json({ error: "Receiver and sender emails are required" });
  }

  try {
    const message = `${from} wants to connect with you to swap skills.`;
    const notification = new Notification({ to, from, message });
    await notification.save();
    res.status(201).json({ message: "Notification created successfully" });
  } catch (err) {
    console.error("Error posting notification:", err);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

export const respondToNotification = async (req, res) => {
  console.log("✅ Request received at backend:", req.body);
  const { from, to, isAccepted } = req.body;

  try {
    const notification = await Notification.findOneAndUpdate(
      { from, to },
      { status: isAccepted ? 'accepted' : 'rejected' },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found." });
    }

    if (isAccepted) {
      let chat = await ChatRoom.findOne({ members: { $all: [from, to] } });
      if (!chat) {
        chat = new ChatRoom({
          members: [from, to],
          messages: []
        });
        await chat.save();
      }

      let chatListTo = await ChatList.findOne({ userEmail: to });
      if (!chatListTo) {
        chatListTo = new ChatList({ userEmail: to, chatsWith: [from] });
      } else if (!chatListTo.chatsWith.includes(from)) {
        chatListTo.chatsWith.push(from);
      }
      await chatListTo.save();

      return res.status(200).json({
        message: "Accepted",
        chatId: chat._id,
        senderEmail: from
      });
    }

    return res.status(200).json({ message: "Rejected" });
  } catch (err) {
    console.error("Error responding to notification:", err);
    res.status(500).json({ error: "Failed to respond to notification" });
  }
};

// Fetch the chat list of the logged-in user
export const getChatList = async (req, res) => {
  console.log("Inside getChatList");

  try {
    const currentUserEmail = req.user?.email || req.query.email || req.params.email;
    console.log("Current user email:", currentUserEmail);

    if (!currentUserEmail) {
      return res.status(400).json({ error: "User email not provided" });
    }

    const list = await ChatList.findOne({ userEmail: currentUserEmail });
    console.log("Chat list doc:", list);

    if (!list) return res.json([]);

    const chatEmails = list.chatsWith || [];
    console.log("Chat with emails:", chatEmails);

    const users = await User.find({ email: { $in: chatEmails } });
    console.log("Fetched users:", users);

    res.json(users);
  } catch (error) {
    console.error("Error fetching chat list:", error);
    res.status(500).json({ error: "Failed to fetch chat list" });
  }
};
