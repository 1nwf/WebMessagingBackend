const user = require("../models/user");

exports.signIn = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = await user
    .findOne({ username: username, password: password })
    .exec();
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(403).json({ message: "password or username is incorrect" });
  }
};
