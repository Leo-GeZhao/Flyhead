const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");

//SignUp User
router.post("/", usersCtrl.create);

//Login User
router.post("/login", usersCtrl.login);

//Google Oauth SignUp & SignIn
router.post("/googleSignIn", usersCtrl.googleSignIn);

module.exports = router;
