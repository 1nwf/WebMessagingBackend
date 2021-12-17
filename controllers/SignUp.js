const user = require("../models/user");

exports.signUp = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    var user_info = req.body;
    user_info.pfp = req.file.originalname;

    const newUser = new user(user_info);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
