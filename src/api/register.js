const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  const isExistUser = await User.findOne({ where: { email } }).catch((err) => {
    console.log("isExistUser Error: ", err);
  });

  if (isExistUser)
    return res.json({ message: "User with email already exits" });

  const hash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({ fullName, email, password: hash });
  const saveUser = await newUser.save().catch((err) => {
    console.log("Register Error: ", err);
    res.json({ message: "Cannot register user at the moment!" });
  });

  if (saveUser) {
    res.json({
      message: `Create user '${fullName}' success!`,
    });
  }
});

module.exports = router;
