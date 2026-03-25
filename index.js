require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

// ===== SOCKET.IO SETUP =====
const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

// Store io globally (optional but useful)
app.set("io", io);

// Socket connection
io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());


// ===== DATABASE CONNECTION =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// ===== ROUTES =====
app.use("/api/auth", require("./routes/auth"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/activity", require("./routes/activity"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/settings", require("./routes/userSettings"));



// ===== SERVER START =====
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
