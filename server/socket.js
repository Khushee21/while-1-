import { Server } from "socket.io";

// Store email to socket ID map
const userSockets = {};

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    //console.log("A user connected:", socket.id);

    // Register user email with their socket ID
    socket.on("register-user", (email) => {
      userSockets[email] = socket.id;
     // console.log(`Registered ${email} with socket ID ${socket.id}`);
    });

    // Handle sending private messages by email
    socket.on("private-message", ({ to, from, message }) => {
      const recipientSocketId = userSockets[to];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("private-message", {
          from,
          message,
          timestamp: Date.now(), // Optional: add timestamp here
        });
       // console.log(`Message from ${from} sent to ${to}`);
      } else {
       // console.log(`User with email ${to} is not connected.`);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      // Remove disconnected socket from userSockets
      for (const email in userSockets) {
        if (userSockets[email] === socket.id) {
          delete userSockets[email];
         // console.log(`Removed ${email} from userSockets`);
          break;
        }
      }
    });
  });
}
