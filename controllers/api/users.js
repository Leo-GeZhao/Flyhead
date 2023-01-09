const User = require("../../models/user");
const { createJWT } = require("../../helpers/auth");
const bcrypt = require("bcrypt");

async function create(req, res, next) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

module.exports = {
  create,
  login,
};
