const io = require("./index.js").io;
const userModel = require("./models/user");

var users = [];
var connectedUsers = users.length;
module.exports = function (socket) {
  const username = socket.username;
  userModel
    .findOneAndUpdate({ username: username }, { status: "online" })
    .exec();

  socket.broadcast.emit(
    "new-user",
    users.filter((el) => el.username != socket.username)
  );
  socket.on("new-connection", (newUser) => {
    if (!users.some((el) => el.username == socket.username)) {
      users.push(newUser);
    } else {
      const userIndex = users.findIndex(
        (obj) => obj.username == newUser.username
      );
      users[userIndex].id = newUser.id;
    }

    userModel
      .findOneAndUpdate({ username: newUser.username }, { status: "online" })
      .exec();

    io.emit("new-user", users);
    console.log("New Users:\n" + JSON.stringify(users));
  });

  socket.on("msg", (msg) => {
    io.emit("new-msg", msg);
  });

  socket.on("dm", ({ dm, to }) => {
    console.log("NEW DM SENT");
    socket.to(to).emit("new-dm", {
      dm,
      from: socket.username,
    });
  });

  socket.on("disconnect", () => {
    const user_info = { id: socket.id, username: socket.username };
    console.log(`${socket.username} disconnected`);
    users = users.filter((el) => el.username != socket.username);
    console.log(users);
    userModel
      .findOneAndUpdate({ username: socket.username }, { status: "offline" })
      .exec();
    io.emit("user_disconnected", users);
  });
};
