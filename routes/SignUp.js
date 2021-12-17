const { signUp, createUser } = require("../controllers/SignUp");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  //destination for files
  destination: function (req, file, cb) {
    cb(null, `user_pfps/`);
  },

  //add back the extensionq
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

router.get("/", signUp);
router.post("/", upload.single("pfp"), createUser);

module.exports = router;
