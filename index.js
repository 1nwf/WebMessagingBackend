const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
require("dotenv").config();
var server = require("http").createServer(app);
const cors = require("cors");

var io = (module.exports.io = require("socket.io")(server, {
  cors: { origin: "*" },
}));
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const signUpRoutes = require("./routes/SignUp");
const signInRoutes = require("./routes/SignIn");
const messageRoutes = require("./routes/Message");

const PORT = process.env.PORT || 8000;

const SocketManager = require("./SocketManager");
mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(cors());

app.use("/user_pfps", express.static(path.join(__dirname, "user_pfps")));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/signUp", signUpRoutes);
app.use("/signIn", signInRoutes);
app.use("/msg", messageRoutes);

app.get("/", (req, res) => {
  res.send("home");
});
server.listen(PORT, () => {
  console.log("Connected to port:" + PORT);
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});
io.on("connection", SocketManager);
