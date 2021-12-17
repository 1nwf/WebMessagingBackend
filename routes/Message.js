const { sendMessage, getMessages } = require("../controllers/Message");

const express = require("express");
const router = express.Router();

router.post("/sendMessage", sendMessage);
router.post("/", getMessages);

module.exports = router;
