const msgModel = require("../models/Message");
const userModel = require("../models/user");
exports.getMessages = async (req, res) => {
  const user = { username: req.body.username, password: req.body.password };
  try {
    await userModel.findOne(user).then((userFound) => {
      if (userFound != null) {
        msgModel
          .findOne({
            $and: [
              { chatUsers: user.username },
              { chatUsers: req.body.chatUser },
            ],
          })

          .then((userMessages) => {
            if (userMessages != null) {
              res.status(200).json(userMessages);
              console.log("messages found");
            } else {
              console.log("no messages");
              res.status(200).json({});
            }
          });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const query = { chatUsers: { $in: [req.body.user_1, req.body.user_2] } };
  var data = null;
  try {
    await msgModel
      .findOne(query)
      .then((msgFound) => {
        if (msgFound == null) {
          const chat = new msgModel({
            chatUsers: [req.body.user_1, req.body.user_2],
            messages: { message: req.body.msg, from: req.body.from },
          });

          chat.save();

          console.log("chat: " + chat);
        } else {
          console.log(msgFound.messages);

          const newData = { message: req.body.msg, from: req.body.from };
          msgFound.messages.push(newData);

          msgFound.save();
          console.log(msgFound);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("DATA: " + data);

    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(409).json({ message: "error" });
  }
};
