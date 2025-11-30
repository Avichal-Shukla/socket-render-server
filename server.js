const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// When a client connects
io.on("connection", (socket) => {
  console.log("🔥 Client connected:", socket.id);

  // Listen for messages coming from the iOS app
  socket.on("message", (data) => {
    console.log("💬 Received message:", data);

    // Send the message back to ALL connected clients (including iOS app)
    io.emit("message", data);
  });

  // When client disconnects
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("🚀 Socket server is running on http://localhost:3000");
});
