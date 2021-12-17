const { signIn } = require("../controllers/SignIn");

const express = require("express");
const router = express.Router();

router.post("/", signIn);
module.exports = router;
