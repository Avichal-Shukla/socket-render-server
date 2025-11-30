const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// HEALTH CHECK for Render
app.get("/", (req, res) => {
  res.send("Socket server is running.");
});

// Socket events
io.on("connection", (socket) => {
  console.log("🔥 Client connected:", socket.id);

  socket.on("message", (data) => {
    console.log("💬 Received:", data);
    io.emit("message", data); // broadcast
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(🚀 Socket server running on ${PORT});
});