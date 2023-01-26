const User = require("../../models/user");

//Create User
async function create(req, res, next) {
  try {
    const token = await User.createUser(req);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

//Login User
async function login(req, res, next) {
  try {
    const token = await User.loginUser(req);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json("Invalid Credentials");
  }
}

//SignUp&SignIn GoogleOauth
async function googleSignIn(req, res, next) {
  try {
    const token = await User.googleOauth(req);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = {
  create,
  login,
  googleSignIn,
};
