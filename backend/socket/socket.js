const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const getReceiverSocketId = (receiverId) => {
  return onlineUsers[receiverId];
};
const onlineUsers = {};
io.on("connection", async (socket) => {
  console.log("connect user", socket.id);
  const userId = socket.handshake.query?.userId;
  onlineUsers[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  // Handle disconnection
  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

module.exports = { app, io, server, getReceiverSocketId };